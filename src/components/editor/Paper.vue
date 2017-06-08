<template lang="html">
  <div ref="paper" class="paper"></div>
</template>

<script>
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
    this.paper = createPaper(this.$refs.paper, graph.graph, this)

    // Define sample table with two columns
    const usersTable = graph.addTable('users')
    graph.addColumn(usersTable, 'id', 'integer', { 'primary key': true, 'allow null': false })
    graph.addColumn(usersTable, 'username', 'string', { 'allow null': false })
  }
}
</script>

<style lang="scss">
  .joint-paper {
    width: 100% !important;
    overflow: hidden;
  }

  .col-text {
    font-size: 12px;
  }

  .header-text {
    font-weight: bold;
    font-size: 12px;
  }
</style>
