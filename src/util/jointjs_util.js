import joint from 'jointjs'
import $ from 'jquery'

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

export const createTable = (name) => {
  // Display constants
  const TITLE_HEIGHT = 40
  const ROW_HEIGHT = 30
  const WIDTH = 200
  const TITLE_COLOR = '#CCCCCC'
  const BG_COLOR_1 = '#F8F8F8'
  const BG_COLOR_2 = '#E8E8E8'
  const TITLE_Y_OFFSET = 20
  const TITLE_X_OFFSET = 30

  // Create table
  const table = new joint.shapes.basic.Rect({
    position: { x: 20, y: 20 },
    size: { width: WIDTH, height: ROW_HEIGHT + 20 },
    attrs: {
      rect: { fill: TITLE_COLOR },
      text: { text: name, 'ref-y': TITLE_Y_OFFSET, 'ref-x': TITLE_X_OFFSET, 'font-size': '18px', 'font-weight': 'bold' }
    },
    columns: [],
    addColumn (name) {
      // Pull the relevant properties out of the table
      const { columns, position, size } = this.attributes
      const color = columns.length % 2 === 0 ? BG_COLOR_1 : BG_COLOR_2
      const yPos = position.y + (columns.length * ROW_HEIGHT) + TITLE_HEIGHT

      // Create the column
      const column = new joint.shapes.devs.Model({
        position: { x: position.x, y: yPos },
        size: { width: WIDTH, height: ROW_HEIGHT },
        attrs: { rect: { fill: color }, text: { text: name } },
        inPorts: ['in'],
        outPorts: ['out'],
        ports: {
          groups: {
            'in': {
              attrs: {
                '.port-body': {
                  fill: '#FFFFFF'
                }
              }
            },
            'out': {
              attrs: {
                '.port-body': {
                  fill: '#FFFFFF'
                }
              }
            }
          }
        }
      })

      // Resize the table to fit new column, embed and track the new column
      this.resize(size.width, size.height + ROW_HEIGHT)
      this.embed(column)
      columns.push(column)

      return column
    }
  })

  // Bind the addColumn method to the table object
  table.attributes.addColumn = table.attributes.addColumn.bind(table)

  return table
}
