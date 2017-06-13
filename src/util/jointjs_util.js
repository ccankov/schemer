import joint from 'jointjs'
import $ from 'jquery'
import * as C from './jointjs_constants'

export const createPaper = (element, graph, component) => {
  // Define paper
  const paper = new joint.dia.Paper({
    el: element,
    width: $(element).width(),
    height: $(element).height(),
    gridSize: 10,
    drawGrid: {
      name: 'mesh',
      color: '#EEE'
    },
    model: graph.graph,
    defaultLink: new joint.dia.Link({
      router: { name: 'manhattan' },
      connector: { name: 'rounded' },
      attrs: {
        '.connection': {
          stroke: '#333333',
          'stroke-width': 3
        },
        '.marker-source': {
          fill: '#333333',
          d: 'M 10 0 L 0 5 L 10 10 z'
        },
        '.marker-target': {
          fill: '#333333',
          d: 'M 10 0 L 0 5 L 10 10 z'
        },
        nodeType: { value: 'link' }
      },
      labels: [
        { position: 30, attrs: { text: { text: ' ' } } },
        { position: -30, attrs: { text: { text: ' ' } } }
      ]
    }),
    validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
      const sourceOptions = cellViewS.model.attributes.attrs.options
      const targetOptions = cellViewT.model.attributes.attrs.options
      // Prevent invalid connections and ones to items that are not ports
      if (!magnetS || !magnetT || !sourceOptions || !targetOptions) {
        return false
      } else {
        const sourcePrimaryOrUnique = (sourceOptions['primaryKey'] || sourceOptions['unique'])
        const targetPrimaryOrUnique = (targetOptions['primaryKey'] || targetOptions['unique'])
        if ((!sourcePrimaryOrUnique && !targetPrimaryOrUnique)) {
          return false
        }
      }
      // Prevent connections where the data types do not match
      if (cellViewS.model.attributes.attrs.colType.value !== cellViewT.model.attributes.attrs.colType.value) {
        return false
      }
      // Prevent duplicate connections
      let links = graph.getLinks()
      links = links.slice(0, links.length - 1)
      let allow = true
      links.forEach(link => {
        const sourceId = link.attributes.source.id
        const targetId = link.attributes.target.id
        if (sourceId === cellViewS.model.id && targetId === cellViewT.model.id) {
          allow = false
        }
      })
      if (!allow) {
        return false
      }
      // Prevent loop linking
      return (magnetS !== magnetT)
    },
    snapLinks: { radius: 75 },
    markAvailable: true,
    linkPinning: false,
    restrictTranslate: function () {
      return { x: 0,
        y: 0,
        width: 1000000,
        height: 1000000
      }
    }
  })

  $(window).resize(() => {
    let container = document.querySelector('.paper-container')
    if (paper.options.width < container.offsetWidth) {
      paper.setDimensions(container.offsetWidth, paper.options.height)
    }
    if (paper.options.height < container.offsetHeight) {
      paper.setDimensions(paper.options.width, container.offsetHeight)
    }
  })

  // When clicking a JointJS element, emit event containing element model
  paper.on('cell:pointerdown',
    (cellView) => {
      if (cellView.model.attributes.type !== 'link') {
        component.$emit('send-element', cellView.model)
      }
    },
  )

  const updateMove = (cellView, evt, x, y) => {
    let bbox = cellView.getBBox()
    let bbox2 = paper.getContentBBox()
    let container = document.querySelector('.paper-container')
    if (bbox.x + bbox.width >= paper.options.width) {
      paper.setDimensions(paper.options.width + paper.options.gridSize, paper.options.height)
      container.scrollLeft = paper.options.width
    } else if (bbox2.x + bbox2.width >= container.offsetWidth) {
      paper.setDimensions(bbox2.x + bbox2.width, paper.options.height)
    }
    if (bbox.y + bbox.height >= paper.options.height) {
      paper.setDimensions(paper.options.width, paper.options.height + paper.options.gridSize)
      container.scrollTop = paper.options.height
    } else if (bbox2.y + bbox2.height >= container.offsetHeight) {
      paper.setDimensions(paper.options.width, bbox2.y + bbox2.height)
    }

    // if (bbox.x <= (container.scrollLeft - 10)) {
    //   container.scrollLeft = bbox.x + 10
    // }
  }

  paper.on('cell:pointermove', updateMove)

  paper.on('link:connect', (cellView) => {
    // Set relationship type
    const targetOptions = cellView.targetView.model.attributes.attrs.options
    const sourceOptions = cellView.sourceView.model.attributes.attrs.options
    if (targetOptions['primaryKey'] && sourceOptions['primaryKey']) {
      cellView.model.prop('labels/0/attrs/text/text', '*')
      cellView.model.prop('labels/1/attrs/text/text', '*')
    } else if ((targetOptions['primaryKey'] && sourceOptions['unique']) ||
               (sourceOptions['primaryKey'] && targetOptions['unique'])) {
      cellView.model.prop('labels/0/attrs/text/text', '1')
      cellView.model.prop('labels/1/attrs/text/text', '1')
    } else if (targetOptions['unique'] || targetOptions['primaryKey']) {
      cellView.model.prop('labels/0/attrs/text/text', '*')
      cellView.model.prop('labels/1/attrs/text/text', '1')
    } else if (sourceOptions['unique'] || sourceOptions['primaryKey']) {
      cellView.model.prop('labels/0/attrs/text/text', '1')
      cellView.model.prop('labels/1/attrs/text/text', '*')
    }
    // Commit the graph when a new link is created
    graph.commit()
  })

  graph.graph.on('add', updateMove)

  graph.graph.on('remove', (cell) => {
    // Commit the graph when a cell is removed
    graph.commit()
  })

  // Handle bounding child elements inside parent element
  graph.graph.on('change:position', (cell, newPosition) => {
    // Update links when an element moves
    const links = graph.getLinks()
    links.forEach(link => {
      if (cell.id !== link.id &&
        cell.attributes.type !== 'link' &&
        cell.attributes.attrs.nodeType.value === 'table') {
        paper.findViewByModel(link).update()
      }
    })

    // Move the element if it doesn't have a parent
    if (cell.attributes.attrs.nodeType.value === 'table') {
      // Avoid collisions with other tables
      let cells = cell.graph.getCells()
      cells.forEach(c => {
        if (c.id === cell.id || c.attributes.type === 'link') {
          return
        }
        if (c.attributes.attrs.nodeType.value === 'table') {
          if (cell.getBBox().intersect(c.getBBox())) {
            cell.set('position', cell.previous('position'))
          }
        }
      })
      return
    }

    // Calculate relative offsets
    let relativePos = cell.position({ parentRelative: true })
    let offsetY = relativePos.y - cell.get('originalPosition').y
    let offsetX = relativePos.x - cell.get('originalPosition').x

    // Reset child position if its relative position has changed
    if (offsetY || offsetX) {
      cell.set('position', cell.previous('position'))
    }

    // Update originalPosition
    cell.set('originalPosition', cell.position({ parentRelative: true }))
  })

  return paper
}

const buildAttributes = function () {
  // Get relevant properties from column
  const position = this.attributes.position
  const color = this.attributes.attrs.rect.fill
  const name = this.attributes.attrs.nodeName
  let textName = name.value
  if (textName.length > 10) textName = textName.substring(0, 10) + '...'
  const type = this.attributes.attrs.colType.value
  const options = this.attributes.attrs.options
  const selectedOptions = Object.keys(options).filter(key => options[key])
  const optionsStr = selectedOptions.join(', ')

  // Create new shapes for the name, type, and options
  const nameShape = new joint.shapes.devs.Model({
    position: { x: position.x, y: position.y },
    size: { width: C.WIDTH / 4, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR },
      text: { text: name.value, 'class': 'col-text' },
      nodeType: { value: 'columnName' },
      options
    },
    z: 1
  })

  const typeShape = new joint.shapes.devs.Model({
    position: { x: position.x + C.WIDTH / 4, y: position.y },
    size: { width: C.WIDTH / 4, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR },
      text: { text: type, 'class': 'col-text' },
      nodeType: { value: 'columnType' },
      options
    },
    z: 1
  })

  const optionsShape = new joint.shapes.devs.Model({
    position: { x: position.x + C.WIDTH / 2, y: position.y },
    size: { width: C.WIDTH / 2, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR },
      text: { text: optionsStr, 'class': 'col-text' },
      nodeType: { value: 'columnOptions' },
      options
    },
    z: 1
  })

  // Embed child shapes into the column shape
  this.embed(nameShape)
  this.embed(typeShape)
  this.embed(optionsShape)

  return [nameShape, typeShape, optionsShape]
}

const addHeaderColumn = function () {
  // Pull relevant table properties
  const { position } = this.attributes
  const yPos = position.y + C.TITLE_HEIGHT
  const color = C.HEADER_COLOR

  // Create the column
  const column = new joint.shapes.devs.Model({
    position: { x: position.x, y: yPos },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR, 'fill-opacity': 0, 'class': 'header-rect' },
      text: { text: ' ' },
      nodeType: { value: 'header' }
    },
    z: 2
  })

  // Create new shapes for the name, type, and options
  const nameShape = new joint.shapes.devs.Model({
    position: { x: position.x, y: yPos },
    size: { width: C.WIDTH / 4, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR },
      text: { text: ' Name', 'class': 'header-text' },
      nodeType: { value: 'columnName' }
    },
    z: 1
  })

  const typeShape = new joint.shapes.devs.Model({
    position: { x: position.x + C.WIDTH / 4, y: yPos },
    size: { width: C.WIDTH / 4, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR },
      text: { text: 'Type', 'class': 'header-text' },
      nodeType: { value: 'columnType' }
    },
    z: 1
  })

  const optionsShape = new joint.shapes.devs.Model({
    position: { x: position.x + C.WIDTH / 2, y: yPos },
    size: { width: C.WIDTH / 2, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR },
      text: { text: 'Options', 'class': 'header-text' },
      nodeType: { value: 'columnOptions' }
    },
    z: 1
  })

  this.embed(column)

  column.embed(nameShape)
  column.embed(typeShape)
  column.embed(optionsShape)
  this.attributes.resizeTable()

  return [column, nameShape, typeShape, optionsShape]
}

const addColumn = function (name, type, options = {}) {
  // Column defaults
  const defaults = {
    primaryKey: false,
    notNull: false,
    indexed: false,
    unique: false,
    default: null
  }

  // Merge custom options with defaults
  options = Object.assign(defaults, options)

  // Pull the relevant properties out of the table
  const { position } = this.attributes
  const columns = this.attributes.attrs.columns.value
  const color = columns.length % 2 === 0 ? C.BG_COLOR_1 : C.BG_COLOR_2
  const yPos = position.y + ((columns.length + 1) * C.ROW_HEIGHT) + C.TITLE_HEIGHT

  // Create the column
  const column = new joint.shapes.devs.Model({
    position: { x: position.x, y: yPos },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, stroke: C.STROKE_COLOR, 'fill-opacity': 0, 'class': 'column-rect' },
      text: { text: ' ' },
      nodeType: { value: 'column' },
      colType: { value: type },
      nodeName: { value: name },
      options
    },
    inPorts: [''],
    outPorts: [' '],
    ports: {
      groups: {
        'in': {
          attrs: {
            '.port-body': {
              fill: '#FFFFFF',
              stroke: C.STROKE_COLOR
            }
          }
        },
        'out': {
          attrs: {
            '.port-body': {
              fill: '#FFFFFF',
              stroke: C.STROKE_COLOR
            }
          }
        }
      }
    },
    z: 2
  })
  column.attributes.buildAttributes = buildAttributes.bind(column)

  // Resize the table to fit new column, embed and track the new column
  this.embed(column)
  this.attributes.attrs.columns.value =
    this.attributes.attrs.columns.value.concat(column.id)
  this.attributes.resizeTable()

  // Create sub-elements to hold properties
  const colAttributes = column.attributes.buildAttributes()

  return [column].concat(colAttributes)
}

const resizeTable = function () {
  // Pull relevant data out of table
  const position = this.attributes.position
  const colIds = this.attributes.attrs.columns.value
  colIds.forEach((colId, idx) => {
    const col = this.graph.getCell(colId)
    if (col) {
      const yPos = position.y + C.TITLE_HEIGHT + (C.ROW_HEIGHT * (idx + 1))
      const embeds = col.attributes.embeds.map(id => this.graph.getCell(id))
      const color = idx % 2 === 0 ? C.BG_COLOR_1 : C.BG_COLOR_2
      this.graph.removeCells([col].concat(embeds))
      col.prop('position/y', yPos)
      embeds.forEach(child => {
        child.prop('position/y', yPos)
        child.prop('attrs/rect/fill', color)
        col.embed(child)
      })
      this.embed(col)
      this.graph.addCells([col].concat(embeds))
      col.set('originalPosition', col.position({ parentRelative: true }))
    }
  })

  // Resize the table based on the number of columns
  this.resize(C.WIDTH, 50 + (C.ROW_HEIGHT * (colIds.length + 1)))
}

const removeColumn = function (id) {
  const colIds = this.attributes.attrs.columns.value
  if (colIds.includes(id)) {
    const column = this.graph.getCell(id)
    const embeds = column.attributes.embeds.map(id => this.graph.getCell(id))
    this.graph.removeCells([column].concat(embeds))
    this.attributes.attrs.columns.value = colIds.filter(colId => colId !== id)
    this.attributes.resizeTable()
  }
}

export const createTable = (name, posX = 20) => {
  let textName = name
  if (textName.length > 10) textName = textName.substring(0, 10) + '...'

  // Create table
  const table = new joint.shapes.basic.Rect({
    position: { x: posX + 400, y: 20 },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT + 20 },
    attrs: {
      rect: { fill: C.TITLE_COLOR, stroke: C.STROKE_COLOR, 'class': 'table-diagram' },
      text: { text: textName, 'ref-y': C.TITLE_Y_OFFSET, 'fill': '#FFFFFF', 'font-size': '18px', 'font-weight': 'bold' },
      nodeType: { value: 'table' },
      nodeName: { value: name },
      columns: { value: [] }
    },
    z: 0
  })
  // Bind methods to the table object
  table.attributes.addColumn = addColumn.bind(table)
  table.attributes.removeColumn = removeColumn.bind(table)
  table.attributes.addHeaderColumn = addHeaderColumn.bind(table)
  table.attributes.resizeTable = resizeTable.bind(table)
  const headerCells = table.attributes.addHeaderColumn()

  return [table].concat(headerCells)
}
