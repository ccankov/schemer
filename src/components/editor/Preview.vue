<template lang="html">
  <section class="sql-preview">
    <span class="header">SQL Preview</span>
    <section class='sql-body'>
      <pre>
        <code class="code">{{sql}}</code>
      </pre>
      <label>
        <span>SQL Language:</span>
        <select v-model='sqlLang'>
          <option v-for='lang in languages'>{{lang}}</option>
        </select>
      </label>
    </section>
  </section>
</template>

<script>
import { RECEIVE_LANGUAGE } from '../../store/mutation_types'

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
  }
}
</script>

<style lang="css">
  .sql-preview {
    flex: 2;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }

  .sql-body {
    display: flex;
    flex-grow: 1;
  }

  pre {
    flex: 2;
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
</style>
