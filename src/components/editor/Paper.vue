<template lang="html">
  <div ref="paper" class="paper">

  </div>
</template>

<script>
import joint from 'jointjs'

export default {
  props: ['graph'],
  mounted () {
    // Store reference to the Vue element
    const vue = this
    // Pull graph out of props
    const graph = this.graph

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
  }
}
</script>

<style lang="css">
</style>
