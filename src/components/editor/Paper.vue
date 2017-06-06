<template lang="html">
  <div>
    <div ref="paper" class="paper"></div>
    <button @click='increment'> Increment Parent Counter </button>
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
  methods: {
    increment: function () {
      this.$store.commit('incrementCounter')
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
    this.$store.commit('updateGraph', { graph })
  }
}
</script>

<style lang="scss">
  .joint-paper {
    width: 100% !important;
    overflow: hidden;
  }
</style>
