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
        <select v-if="graphs.length > 0" v-model="currGraph">
          <option v-for="graph in graphs"   v-bind:value="graph">
           {{ graph.dbName }}
         </option>
        </select>
        <button
          v-if="graphs.length > 0"
          @click='loadDb'
          :disabled='loading'>Load</button>
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
import { RECEIVE_ERRORS, RECEIVE_DBNAME, RECEIVE_USER_GRAPHS, TOGGLE_NEW_DB, FETCH_GRAPH } from '../../store/mutation_types'
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
      id: this.$route.params.id,
      graph: null,
      currGraph: null,
      currentElement: null,
      editName: false,
      dbName: this.$store.state.graphJSON.dbName,
      loading: false
    }
  },
  computed: {
    graphs: function () {
      return this.$store.state.userGraphs
    },
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
    loadDb: function () {
      // fetch db, then load db
      this.loading = true
      this.$store.dispatch(FETCH_GRAPH, {graphId: this.currGraph._id}).then(
        res => {
          let graph = {cells: this.$store.state.graphJSON.cells}
          this.dbName = res.dbName
          this.graph.loadJSON(graph)
          this.receiveElement(null)
          this.graph.commit()
          this.loading = false
        }
      )
    },
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
      this.editName = false
      if (!this.editName) {
        this.$store.commit(RECEIVE_DBNAME, { dbName: this.dbName })
        this.saveDb()
      }
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
    position: relative;
  }

  .paper-menu {
    position: absolute;
    height: 120px;
    width: 90px;
    top: 0px;
    left: 0px;
  }
</style>
