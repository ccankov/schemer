<template lang="html">
  <section class="editor">
    <section class="table-form">
      <table-form
        :graph='graph'
        v-on:send-element='receiveElement'
        :currentElement='currentElement'></table-form>

    </section>
    <section class="body">
      <Paper :graph="graph" v-on:send-element="receiveElement"></Paper>
      <section class="additional-info">
        <Statistics :json="json"></Statistics>
        <Preview :sql="sql"></Preview>
      </section>
    </section>
  </section>
</template>

<script>
import { createSQL, parseJson } from '../../util/sql_util.js'
import Graph from '../../util/graph_util'
import Cell from '../../util/cell'
import Paper from './Paper'
import Preview from './Preview'
import TableForm from './TableForm'
import Statistics from './Statistics'
export default {
  components: {
    Paper,
    Preview,
    'table-form': TableForm,
    Statistics
  },
  data: function () {
    return {
      graph: null,
      currentElement: null
    }
  },
  computed: {
    json: function () {
      return parseJson(this.$store.state.graphJSON)
    },
    sql: function () {
      let json = this.$store.state.graphJSON
      return createSQL(json)
    }
  },
  methods: {
    receiveElement: function (element) {
      console.log('new element')
      console.log(element)
      this.currentElement = new Cell(element)
    },
    setCurrent: function (id) {
      this.currentElement = this.graph.getCell(id)
    }
  },
  created () {
    this.graph = new Graph(this.$store)
  }
}
</script>

<style lang="css">
  .editor {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 97vh;
    border: 1px solid black;
  }

  .table-form {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .table-form button {
    margin: 10px auto;
  }

  .body {
    border: 1px solid black;
    flex: 5;
    display: flex;
    flex-direction: column;
  }

  .additional-info {
    display: flex;
    height: 20vh;
    max-height: 20vh;
  }
</style>
