<template lang="html">
  <section class="editor">
    <section class="side-bar">
      <!-- <nav class="side-nav">
        <div class="home-button">
          <i class="fa fa-home fa-lg" aria-hidden="true"></i>
        </div>
        <section class=schemer-user>
          <h1>Schemer</h1>
          <h2>Welcome, {{$store.state.currentUser.username}}</h2>
        </section>
      </nav> -->
      <section class="db-info">
        <h1 v-if='editName'>
          <input v-model='dbName' placeholder='Name your DB'/>
        </h1>
        <h1 v-else='editName'>{{dbName}}</h1>
        <button @click='toggleEdit'>{{btnStr}}</button>
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
      <section class="sql-preview">
        <Preview :sql="sql"></Preview>
      </section>
      <section class="paper-menu">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </section>
    </section>
  </section>
</template>

<script>
import { CLEAR_ERRORS, RECEIVE_ERRORS, RECEIVE_DBNAME } from '../../store/mutation_types'
import { createSQL, parseJson } from '../../util/sql_util'
import Graph from '../../util/graph'
import Cell from '../../util/cell'
import Paper from './Paper'
import Preview from './Preview'
import TableForm from './TableForm'
import Statistics from './Statistics'

import { fetchGraph } from '../../util/api_util'

export default {
  components: {
    Paper,
    Preview,
    'table-form': TableForm,
    Statistics
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
      this.currentElement = new Cell(element)
      this.$store.commit(CLEAR_ERRORS)
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
      fetchGraph(this.$route.params.id).then(res => console.log(res))
    }

    this.graph = new Graph(this.$store)
    this.$store.commit(RECEIVE_ERRORS, { errors: ['select an element'] })
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

  .side-bar {
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

  .sql-preview {
    position: fixed;
    bottom: 15px;
    right: 150px;
    display: flex;
    height: 30vh;
    max-height: 30vh;
    width: 40vw;
    min-width: 400px;
  }

  .paper-menu {
    position: fixed;
    width: 100px;
    bottom: 15px;
    right: 10px;
  }
</style>
