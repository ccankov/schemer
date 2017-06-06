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

    if (!cell.get('originalPosition')) {
      // Set originalPosition the first time
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
