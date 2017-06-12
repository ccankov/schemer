<template lang="html">
  <section class="editor">
    <section class="side-bar-container">
      <section class="db-info">
        <h1 v-if='editName'>
          <input v-model='dbName' placeholder='Name your DB'/>
        </h1>
        <h1 v-else='editName'>{{dbName}}</h1>
        <button @click='toggleEdit'>{{btnStr}}</button>
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
import { RECEIVE_ERRORS, RECEIVE_DBNAME } from '../../store/mutation_types'
import { createSQL, parseJson } from '../../util/sql_util'
import Graph from '../../util/graph'
import Cell from '../../util/cell'
import Paper from './Paper'
import Preview from './Preview'
import SideBar from './SideBar'

import { fetchGraph } from '../../util/api_util'

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
      currentElement: null,
      editName: false,
      dbName: this.$store.state.graphJSON.dbName
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
    }
  },
  methods: {
    receiveElement: function (element) {
      if (element) {
        this.currentElement = new Cell(element)
      } else {
        this.currentElement = null
      }
    },
    toggleEdit: function () {
      if (this.editName) {
        this.$store.commit(RECEIVE_DBNAME, { dbName: this.dbName })
      }
      this.editName = !this.editName
    }
  },
  created () {
    if (this.$route.params.id) {
      fetchGraph(this.$route.params.id).then(
        res => console.log(res),
        errors => this.$store.commit(RECEIVE_ERRORS, { errors })
      )
    }

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
