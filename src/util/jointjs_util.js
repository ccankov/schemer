import joint from 'jointjs'
import $ from 'jquery'
import * as C from './jointjs_constants'

export const createPaper = (element, graph, component) => {
  // Define paper
  const paper = new joint.dia.Paper({
    el: element,
    width: $(element).width(),
    height: 600,
    gridSize: 1,
    model: graph
  })

  // Adjust the size of the paper on window resize
  $(window).resize(() => {
    const canvas = $(element)
    paper.setDimensions(canvas.width(), 600)
  })

  // Bound elements inside paper
  paper.options.restrictTranslate = function (cellView) {
    return cellView.paper.getArea()
  }

  // When clicking a JointJS element, emit event containing element model
  paper.on('cell:pointerdown',
    (cellView) => {
      component.$emit('send-element', cellView.model)
    },
  )
}

export const createGraph = () => {
  // Initialize graph
  const graph = new joint.dia.Graph()

  // Handle bounding child elements inside parent element
  graph.on('change:position', (cell, newPosition) => {
    const parentId = cell.get('parent')

    // Move the element if it doesn't have a parent
    if (!parentId) return

    // Set originalPosition to the relative position of the column
    if (!cell.get('originalPosition')) {
      cell.set('position', cell.previous('position'))
      cell.set('originalPosition', cell.position({ parentRelative: true }))
      cell.set('position', newPosition)
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

  return graph
}

export const loadGraphFromJSON = json => {
  const graph = createGraph()
  graph.fromJSON(json)
  return graph
}

export const addCellsToGraph = function (cells, graph) {
  cells.forEach(cell => {
    graph.addCells(cell)
    cell.set('originalPosition', cell.position({ parentRelative: true }))
  })
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
      rect: { fill: color },
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
      rect: { fill: color },
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
      rect: { fill: color },
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
  const { position, size } = this.attributes
  const yPos = position.y + C.TITLE_HEIGHT
  const color = C.HEADER_COLOR

  // Create the column
  const column = new joint.shapes.devs.Model({
    position: { x: position.x, y: yPos },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, 'fill-opacity': 0 },
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
      rect: { fill: color },
      text: { text: ' Name', 'class': 'header-text' },
      nodeType: { value: 'columnName' }
    },
    z: 1
  })

  const typeShape = new joint.shapes.devs.Model({
    position: { x: position.x + C.WIDTH / 4, y: yPos },
    size: { width: C.WIDTH / 4, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color },
      text: { text: 'Type', 'class': 'header-text' },
      nodeType: { value: 'columnType' }
    },
    z: 1
  })

  const optionsShape = new joint.shapes.devs.Model({
    position: { x: position.x + C.WIDTH / 2, y: yPos },
    size: { width: C.WIDTH / 2, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color },
      text: { text: 'Options', 'class': 'header-text' },
      nodeType: { value: 'columnOptions' }
    },
    z: 1
  })

  this.resize(size.width, size.height + C.ROW_HEIGHT)
  this.embed(column)

  column.embed(nameShape)
  column.attr('nodeName', { shapeId: nameShape.id })
  column.embed(typeShape)
  column.attr('colType', { shapeId: typeShape.id })
  column.embed(optionsShape)
  column.attr('options', { shapeId: optionsShape.id })

  return [column, nameShape, typeShape, optionsShape]
}

const addColumn = function (name, type, options = {}) {
  // Column defaults
  const defaults = {
    'primary key': false,
    'allow null': false,
    unique: false,
    default: null
  }

  // Merge custom options with defaults
  options = Object.assign(defaults, options)

  // Pull the relevant properties out of the table
  const { position, size } = this.attributes
  const columns = this.attributes.attrs.columns.value
  const color = columns.length % 2 === 0 ? C.BG_COLOR_1 : C.BG_COLOR_2
  const yPos = position.y + ((columns.length + 1) * C.ROW_HEIGHT) + C.TITLE_HEIGHT

  // Create the column
  const column = new joint.shapes.devs.Model({
    position: { x: position.x, y: yPos },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT },
    attrs: {
      rect: { fill: color, 'fill-opacity': 0 },
      text: { text: ' ' },
      nodeType: { value: 'column' },
      colType: { value: type },
      nodeName: { value: name },
      options
    },
    z: 2
  })
  column.attributes.buildAttributes = buildAttributes.bind(column)

  // Resize the table to fit new column, embed and track the new column
  this.resize(size.width, size.height + C.ROW_HEIGHT)
  this.embed(column)
  columns.push(column.id)

  // Create sub-elements to hold properties
  const colAttributes = column.attributes.buildAttributes()

  return [column].concat(colAttributes)
}

export const createTable = (name) => {
  let textName = name
  if (textName.length > 10) textName = textName.substring(0, 10) + '...'

  // Create table
  const table = new joint.shapes.basic.Rect({
    position: { x: 20, y: 20 },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT + 20 },
    attrs: {
      rect: { fill: C.TITLE_COLOR },
      text: { text: textName, 'ref-y': C.TITLE_Y_OFFSET, 'font-size': '18px', 'font-weight': 'bold' },
      nodeType: { value: 'table' },
      nodeName: { value: name },
      columns: { value: [] }
    },
    z: 0
  })
  // Bind methods to the table object
  table.attributes.addColumn = addColumn.bind(table)
  table.attributes.addHeaderColumn = addHeaderColumn.bind(table)
  const headerCells = table.attributes.addHeaderColumn()

  return [table].concat(headerCells)
}

export const getElementName = element => (
  element ? element.attributes.attrs.text.text : ''
)

export const setElementName = (element, name) => (
  element ? element.attr('text', { text: name }) : null
)

export const getParentId = element => (
  element ? element.attributes.parent : ''
)

export const getElementType = element => (
  element ? element.attributes.attrs.nodeType.value : 'none'
)

export const isTable = element => (
  getElementType(element) === 'table'
)
