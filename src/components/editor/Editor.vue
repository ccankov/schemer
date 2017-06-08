<template lang="html">
  <section class="editor">
    <section class="table-form">
      <!-- <button @click='saveGraph'>Save Graph to DB</button> -->
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
import { createGraph, getElementName } from '../../util/jointjs_util'
import { RECEIVE_GRAPH, UPDATE_GRAPH } from '../../store/mutation_types'
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
    },
    currentElementName: {
      get: function () {
        return getElementName(this.currentElement)
      },
      set: function (val) {
        const cell = this.graph.getCell(this.currentElement.id)
        let textVal = val
        if (val.length > 10) textVal = val.substring(0, 10) + '...'
        cell.attr('text', { text: textVal })
        cell.attr('nodeName', { value: val })
        this.commitGraph()
      }
    }
  },
  methods: {
    receiveElement: function (element) {
      this.currentElement = element
    },
    setCurrent: function (id) {
      this.currentElement = this.getCell(id)
    },
    getCell: function (id) {
      this.graph.getCell(id)
    },
    commitGraph: function () {
      this.$store.commit(RECEIVE_GRAPH, { graph: this.graph })
    },
    saveGraph: function () {
      this.$store.dispatch(UPDATE_GRAPH, { graph: this.graph })
    }
  },
  created () {
    this.graph = createGraph()
    this.commitGraph()
  }
}
</script>

<style lang="css">
  .editor {
    display: flex;
    width: 100%;
    height: 100%;
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
  }
</style>
