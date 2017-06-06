<template lang="html">
  <div ref="paper" id='paper' class="paper">

  </div>
</template>

<script>
import joint from 'jointjs'

export default {
  mounted () {
    // Store reference to the Vue element
    const vue = this
    // Pull graph out of props
    const graph = new joint.dia.Graph()
    graph.fromJSON(this.$store.state.graphJSON)

    // Define paper
    const paper = new joint.dia.Paper({
      el: this.$refs.paper,
      gridSize: 1,
      model: graph
    })

    // When clicking a JointJS element, emit event containing element model
    paper.on('cell:pointerdown',
      (cellView) => {
        vue.$emit('send-element', cellView.model)
      },
    )

    // Define some basic shapes
    const usersTable = new joint.shapes.basic.Rect({
      position: { x: 20, y: 20 },
      size: { width: 200, height: 200 },
      attrs: {
        rect: { fill: '#E74C3C' },
        text: { text: 'users', 'ref-y': 15 }
      }
    })
    const colId = new joint.shapes.basic.Rect({
      position: { x: 20, y: 60 },
      size: { width: 200, height: 40 },
      attrs: { rect: { fill: '#F1C40F' }, text: { text: 'id' } }
    })

    const colUsername = new joint.shapes.basic.Rect({
      position: { x: 20, y: 100 },
      size: { width: 200, height: 40 },
      attrs: { rect: { fill: '#F1C40F' }, text: { text: 'username' } }
    })

    // Make column elements be inside the table element
    usersTable.embed(colId)
    usersTable.embed(colUsername)

    // Add the cells to the graph (model)
    graph.addCells([usersTable, colId, colUsername])

    // Handle bounding child elements inside parent element
    graph.on('change:position', (cell) => {
      const parentId = cell.get('parent')
      if (!parentId) return

      const parent = graph.getCell(parentId)
      const parentBbox = parent.getBBox()
      const cellBbox = cell.getBBox()

      if (parentBbox.containsPoint(cellBbox.origin()) &&
          parentBbox.containsPoint(cellBbox.topRight()) &&
          parentBbox.containsPoint(cellBbox.corner()) &&
          parentBbox.containsPoint(cellBbox.bottomLeft())) {
        // All the four corners of the child are inside
        // the parent area.
        return
      }

      // Revert the child position.
      cell.set('position', cell.previous('position'))
    })
  }
}
</script>

<style lang="css">
</style>
