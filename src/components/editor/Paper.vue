<template lang="html">
  <div ref="paper" class="paper">

  </div>
</template>

<script>
import { createPaper, createTable } from '../../util/jointjs_util'

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

    // Define sample table with two columns
    const usersTable = createTable('users')
    const colId = usersTable.attributes.addColumn('id')
    const colUsername = usersTable.attributes.addColumn('username')

    // Add the cells to the graph (model)
    graph.addCells([usersTable, colId, colUsername])
    window.graph = graph
  }
}
</script>

<style lang="scss">
  .joint-paper {
    width: 100% !important;
    overflow: hidden;
  }
</style>
