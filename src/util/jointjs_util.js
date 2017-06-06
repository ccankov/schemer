import joint from 'jointjs'

export const createPaper = (element, graph, component) => {
  // Define paper
  const paper = new joint.dia.Paper({
    el: element,
    gridSize: 1,
    model: graph
  })

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
    let offsetY = cell.position({ parentRelative: true }).y - cell.get('originalPosition').y

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
  const ROW_HEIGHT = 40
  const WIDTH = 200
  const TITLE_COLOR = '#CCCCCC'
  const BG_COLOR_1 = '#F8F8F8'
  const BG_COLOR_2 = '#EEEEEE'
  const TITLE_Y_OFFSET = 20
  const TITLE_X_OFFSET = 25

  // Create table
  const table = new joint.shapes.basic.Rect({
    position: { x: 20, y: 20 },
    size: { width: WIDTH, height: ROW_HEIGHT + 20 },
    attrs: {
      rect: { fill: TITLE_COLOR },
      text: { text: name, 'ref-y': TITLE_Y_OFFSET, 'ref-x': TITLE_X_OFFSET }
    },
    columns: [],
    addColumn (name) {
      // Pull the relevant properties out of the table
      const { columns, position, size } = this.attributes
      const color = columns.length % 2 === 0 ? BG_COLOR_1 : BG_COLOR_2
      const yPos = position.y + (columns.length * 40) + 40

      // Create the column
      const column = new joint.shapes.basic.Rect({
        position: { x: position.x, y: yPos },
        size: { width: WIDTH, height: ROW_HEIGHT },
        attrs: { rect: { fill: color }, text: { text: name } }
      })

      // Resize the table to fit new column, embed and track the new column
      this.resize(size.width, size.height + 40)
      this.embed(column)
      columns.push(column)

      return column
    }
  })

  // Bind the addColumn method to the table object
  table.attributes.addColumn = table.attributes.addColumn.bind(table)

  return table
}
