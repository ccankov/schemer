<template lang="html">
  <section class="fixed-container">
    <section class="sql-preview">
      <header>
        <span class="heading-text">SQL Preview</span>
        <span class="options-text">
          <select v-model='sqlLang' class="lang-select">
            <option v-for='lang in languages'>{{lang}}</option>
          </select>
            <i class="fa fa-thumb-tack" aria-hidden="true"></i>
        </span>
      </header>
      <section class='sql-body'>
        <pre>
          <code class="code">{{sql}}</code>
        </pre>
      </section>
    </section>
    <section class="paper-menu">
      <span class='button small' @click='exportSQL'><i class="fa fa-download" aria-hidden="true"></i></span>
      <span class='button' @click='exportSQL'><i class="fa fa-plus" aria-hidden="true"></i></span>
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

<style lang="scss">
  @import '../../assets/app.scss';

  .sql-preview {
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: $darkest-gray;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    i {
      font-size: 0.6em;
      color: $white;
    }
  }

  .sql-body {
    display: flex;
    flex-grow: 1;
  }

  pre {
    flex: 5;
    display: flex;
    background-color:#EEEEEE;
    padding: 10px 20px;
    margin: 0;
    overflow-y: auto;
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

  .heading-text {
    font-family: $heading;
    font-size: 0.9em;
    color: $white;
    font-weight: bold;
  }

  .options-text {
    display: flex;
    align-items: center;
    font-size: 16px;

    i {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 22px;
      height: 22px;
      border: 1px solid $white;
      border-radius: 50%;
    }

    i:hover {
      cursor: pointer;
      background-color: $white;
      color: $darkest-gray;
    }
  }

  .lang-select {
    width: 120px;
    margin-right: 20px;
  }

  .fixed-container {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 650px;
    height: 30vh;
  }

  .paper-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      color: $white;
      font-weight: 500;
      margin: 5px 10px;
      background-color: $light-accent;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
    }

    .small {
      height: 15px;
      width: 15px;
    }

    .button:hover {
      cursor: pointer;
      box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
      -webkit-transition: box-shadow 150ms cubic-bezier(0,0,.2,1);
      transition: box-shadow 150ms cubic-bezier(0,0,.2,1);
    }
  }
</style>
