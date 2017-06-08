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
  column.embed(typeShape)
  column.embed(optionsShape)

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
  this.attributes.attrs.columns.value =
    this.attributes.attrs.columns.value.concat(column.id)

  // using push causes mad vuex
  // columns.push(column.id)

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
