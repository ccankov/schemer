import joint from 'jointjs'
// import { Model } from 'backbone-model'
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

    // Reset child position if its relative position has changed
    if (offsetY || relativePos.x) {
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

const buildAttributes = function (options) {

}

const addColumn = function (name, type, options = {}) {
  // Column defaults
  const defaults = {
    primaryKey: false,
    allowNull: true,
    unique: false,
    defaultVal: null
  }

  // Merge custom options with defaults
  options = Object.assign(defaults, options, { colType: type })

  // Pull the relevant properties out of the table
  const { columns, position, size } = this.attributes
  const color = columns.length % 2 === 0 ? C.BG_COLOR_1 : C.BG_COLOR_2
  const yPos = position.y + (columns.length * C.ROW_HEIGHT) + C.TITLE_HEIGHT

  // Create the column
  const column = new joint.shapes.devs.Model({
    nodeType: 'column',
    position: { x: position.x, y: yPos },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT },
    attrs: { rect: { fill: color }, text: { text: name } },
    options
  })
  console.log(column)
  column.attributes.buildAttributes = buildAttributes.bind(column)

  // Resize the table to fit new column, embed and track the new column
  this.resize(size.width, size.height + C.ROW_HEIGHT)
  this.embed(column)
  columns.push(column.id)

  return column
}

export const createTable = (name) => {
  // Create table
  const table = new joint.shapes.basic.Rect({
    nodeType: 'table',
    position: { x: 20, y: 20 },
    size: { width: C.WIDTH, height: C.ROW_HEIGHT + 20 },
    attrs: {
      rect: { fill: C.TITLE_COLOR },
      text: { text: name, 'ref-y': C.TITLE_Y_OFFSET, 'font-size': '18px', 'font-weight': 'bold' }
    },
    columns: []
  })
  // Bind the addColumn method to the table object
  table.attributes.addColumn = addColumn.bind(table)

  return table
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
  element ? element.attributes.nodeType : 'none'
)

export const isTable = element => (
  getElementType(element) === 'table'
)
