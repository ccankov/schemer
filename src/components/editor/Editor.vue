<template lang="html">
  <section class="editor">
    <section class="side-bar-container">
      <section class="db-info">
        <h1 v-if='editName'>
          <input
            autofocus
            @blur="disableEdit()"
            @keyup.enter="disableEdit"
            v-model='dbName'
            placeholder='Name your DB'/>
        </h1>
        <h1 @dblclick="enableEdit" v-else='editName'>
          <span>{{ dbName }}</span>
        </h1>
        <button v-if='loggedIn' @click='saveDb'>Save</button>
        <br>
        <br>
        <span v-if="loggedIn">Load: </span>
        <select v-if="loggedIn" v-model="currGraph">
          <option v-for="graph in graphs"   v-bind:value="graph">
           {{ graph.dbName }}
         </option>
        </select>
      </section>
      <SideBar
        :graph='graph'
        :currentElement='currentElement'
        @send-element='receiveElement'>
      </SideBar>
      </section>
    <section class="body">
      <Paper :graph="graph" v-on:send-element="receiveElement"></Paper>
      <Preview :sql="sql" :graph="graph"></Preview>
    </section>
  </section>
</template>

<script>
import { RECEIVE_ERRORS, RECEIVE_DBNAME, RECEIVE_USER_GRAPHS, TOGGLE_NEW_DB } from '../../store/mutation_types'
import { createSQL, parseJson } from '../../util/sql_util'
import Graph from '../../util/graph'
import Cell from '../../util/cell'
import Paper from './Paper'
import Preview from './Preview'
import SideBar from './SideBar'
import { updateGraph } from '../../util/api_util'

export default {
  components: {
    Paper,
    Preview,
    SideBar
  },
  data: function () {
    return {
      graphs: this.$store.state.userGraphs,
      id: this.$route.params.id,
      graph: null,
      currGraph: null,
      currentElement: null,
      editName: false,
      dbName: this.$store.state.graphJSON.dbName
    }
  },
  watch: {
    currGraph: function (newGraph) {
      let graph = {cells: JSON.parse(JSON.stringify(newGraph.graph).replace(/U\+FF0Eport/g, '.port'))}
      this.dbName = newGraph.dbName
      this.graph.loadJSON(graph)
      this.receiveElement(null)
      this.graph.commit()
    }
  },
  computed: {
    btnStr: function () {
      return this.editName ? 'Done' : 'Edit'
    },
    json: function () {
      return parseJson(this.$store.state.graphJSON)
    },
    sql: function () {
      let json = this.$store.state.graphJSON
      return createSQL(json)
    },
    loggedIn: function () {
      return Boolean(this.$store.state.currentUser)
    }
  },
  methods: {
    receiveElement: function (element) {
      if (element) {
        const cell = new Cell(element)
        if (cell.type() === 'header') {
          this.currentElement = this.graph.getCell(cell.parentId())
        } else {
          this.currentElement = cell
        }
      } else {
        this.currentElement = null
      }
    },
    enableEdit: function () {
      this.editName = true
    },
    disableEdit: function () {
      if (this.editName) {
        this.$store.commit(RECEIVE_DBNAME, { dbName: this.dbName })
        if (this.$store.state.currentUser) {
          updateGraph(JSON.stringify(this.$store.state.graphJSON))
        }
      }
      this.editName = false
    },
    saveDb: function () {
      if (this.$store.state.currentUser) {
        updateGraph(JSON.stringify(this.$store.state.graphJSON))
        this.$store.dispatch(RECEIVE_USER_GRAPHS).then(
          res => {
            this.graphs = this.$store.state.userGraphs
          }
        )
      } else {
        this.$store.commit(RECEIVE_ERRORS, 'Must be logged in to save')
      }
    }
  },
  beforeUpdate () {
    if (this.$store.state.newDb) {
      this.graph.loadJSON({ cells: [] })
      this.$store.commit(RECEIVE_DBNAME, { dbName: 'New Database' })
      this.$store.commit(TOGGLE_NEW_DB)
      this.dbName = this.$store.state.graphJSON.dbName
      this.receiveElement(null)
    }
  },
  created () {
    this.$store.dispatch(RECEIVE_USER_GRAPHS).then(
      res => {
        this.graphs = this.$store.state.userGraphs
      }
    )
    this.graph = new Graph(this.$store)
  }
}
</script>

<style lang="scss">
  @import '../../assets/app.scss';

  .editor {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 60px;
  }

  .side-bar-container {
    width: 20vw;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid $light-gray;
    box-sizing: border-box;
  }

  .side-nav {
    margin: 0;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    box-sizing: border-box;
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

    position: relative;
  }

  .table-form button {
    margin: 10px auto;
  }

  .body {
    display: flex;
    flex: 1;
    max-width: calc(100% - 300px);
    flex-direction: column;
    box-sizing: border-box;
  }

  .paper-menu {
    position: fixed;
    width: 100px;
    bottom: 15px;
    right: 10px;
  }
</style>
