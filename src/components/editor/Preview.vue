<template lang="html">
  <section class="sql-preview">
    <span class="header">SQL Preview</span>
    <section class='sql-body'>
      <pre>
        <code class="code">{{sql}}</code>
      </pre>
      <section class='sql-options'>
        <label>
          <span>SQL Language:</span>
          <select v-model='sqlLang'>
            <option v-for='lang in languages'>{{lang}}</option>
          </select>
        </label>
        <span class='button' @click='exportSQL'> Export SQL </span>
      </section>
    </section>
  </section>
</template>

<script>
import { RECEIVE_LANGUAGE } from '../../store/mutation_types'
var FileSaver = require('file-saver')

export default {
  props: ['sql'],
  data: () => ({
    languages: ['postgreSQL', 'access', 'mySQL', 'SQL Server', 'oracle']
  }),
  computed: {
    sqlLang: {
      get: function () {
        return this.$store.state.graphJSON.sqlLang
      },
      set: function (newLang) {
        this.$store.commit(RECEIVE_LANGUAGE, { sqlLang: newLang })
      }
    }
  },
  methods: {
    exportSQL: function () {
      let blob = new Blob([this.sql], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, `${this.$store.state.graphJSON.dbName}.sql`)
    }
  }
}
</script>

<style lang="css">
  .sql-preview {
    display: flex;
    flex-direction: column;
  }

  .sql-preview {

  }

  .sql-body {
    display: flex;
    flex-grow: 1;
  }

  pre {
    flex: 5;
    display: flex;
    background-color:#EEEEEE;
    padding: 3px;
    margin: 0;
    overflow-y: scroll;
  }

  .sql-body label {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .sql-options {
    background-color: #EEE;
    border-left: 1px solid black;
  }

  .code {
    text-align: left;
    margin: 0;
    white-space: pre;
  }

  .button {
    display: block;
    color: #1c56b2;
    font-weight: 500;
    margin: 5px 10px;
    border: 1px solid #1c56b2;
    border-radius: 5px;
    padding: 3px;
  }

  .button:hover {
    opacity: .7;
    cursor: pointer;
    /*text-decoration: underline;*/
    transition: border .3s;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.8);
  }
</style>
