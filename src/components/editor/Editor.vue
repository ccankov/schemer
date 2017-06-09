<template lang="html">
  <section class="editor">
    <section class="side-bar">
      <nav class="side-nav">
        <div class="home-button">
          <i class="fa fa-home fa-lg" aria-hidden="true"></i>
        </div>
        <section class=schemer-user>
          <h1>Schemer</h1>
          <h2>Welcome, {{$store.state.currentUser.username}}</h2>
        </section>
      </nav>
      <section class="db-info">
        <h1>{{$store.state.dbName}}</h1>
      </section>
      <section class="table-form">
        <table-form
        :graph='graph'
        v-on:send-element='receiveElement'
        :currentElement='currentElement'></table-form>
      </section>
    </section>
    <section class="body">
      <Paper :graph="graph" v-on:send-element="receiveElement"></Paper>
      <section class="additional-info">
        <Statistics></Statistics>
        <Preview :sql="sql"></Preview>
      </section>
    </section>
  </section>
</template>

<script>
import { createSQL, parseJson } from '../../util/sql_util.js'
import Graph from '../../util/graph'
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
      this.currentElement = new Cell(element)
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

  .side-bar {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .side-nav {
    margin: 0;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-content: center;
    border-bottom: 1px solid black;
    width: 100%;
  }

  .home-button {
    text-align: center;
    vertical-align: center;
    margin: auto 5px auto 10px;
    padding: 5px;
    border: 2px solid black;
    border-radius: 10px;
  }

  .schemer-user {
    display: flex;
    flex-direction: column;
    margin: 0px 12px;
    justify-content: space-around;
  }

  .schemer-user h1 {
    font-size: 1.8em;
    color: #1c56b2;
    margin: 0;
  }

  .schemer-user h2 {
    font-size: 1.1em;
    font-weight: normal;
    margin: 0;
  }

  .db-info {
    width: 100%;
  }

  .db-info h1 {
    font-size: 1.5em;
    margin: 10px auto 0 auto;
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
    max-width: 75vw;
    flex-direction: column;
  }

  .additional-info {
    display: flex;
    height: 20vh;
    max-height: 20vh;
  }
</style>
