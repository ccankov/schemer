<template lang="html">
  <div ref="paper" class="paper">

  </div>
</template>

<script>
import joint from 'jointjs'
import { createPaper } from '../../util/jointjs_util'

export default {
  props: ['graph'],
  data () {
    return {
      paper: null
    }
  },
  mounted () {
    // Pull graph out of props
    const graph = this.graph
    // Set up paper
    this.paper = createPaper(this.$refs.paper, graph, this)

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
  }
}
</script>

<style lang="css">
</style>
