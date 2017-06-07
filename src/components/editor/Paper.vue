<template lang="html">
  <div ref="paper" class="paper"></div>
</template>

<script>
import { createPaper, createTable, addCellsToGraph } from '../../util/jointjs_util'
import { RECEIVE_GRAPH } from '../../store/mutation_types'

export default {
  props: ['graph'],
  data () {
    return {
      paper: null
    }
  },
  methods: {
    commitGraph: function () {
      this.$store.commit(RECEIVE_GRAPH, { graph: this.graph })
    }
  },
  mounted () {
    // Pull graph out of props
    const graph = this.graph

    // Set up paper
    this.paper = createPaper(this.$refs.paper, graph, this)

    // Define sample table with two columns
    const usersTable = createTable('users')
    const colId = usersTable[0].attributes.addColumn('id', 'integer', { 'primary key': true, 'allow null': false })
    const colUsername = usersTable[0].attributes.addColumn('username', 'string', { 'allow null': false })

    // Add the cells to the graph (model)
    addCellsToGraph(usersTable.concat(colId).concat(colUsername), graph)
    this.commitGraph()
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
