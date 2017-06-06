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
        rect: { 'fill-opacity': 0 },
        text: { text: 'users', 'ref-y': 15 }
      },
      z: 2
    })
    const colId = new joint.shapes.basic.Rect({
      position: { x: 20, y: 60 },
      size: { width: 200, height: 40 },
      attrs: { rect: { fill: '#F1C40F' }, text: { text: 'id' } },
      z: 1
    })

    const colUsername = new joint.shapes.basic.Rect({
      position: { x: 20, y: 100 },
      size: { width: 200, height: 40 },
      attrs: { rect: { fill: '#F1C40F' }, text: { text: 'username' } },
      z: 1
    })

    // Make column elements be inside the table element
    usersTable.embed(colId)
    usersTable.embed(colUsername)

    // Add the cells to the graph (model)
    graph.addCells([usersTable, colId, colUsername])
  }
}
</script>

<style lang="css">
</style>
