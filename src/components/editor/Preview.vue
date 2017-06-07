<template lang="html">
  <section class="sql-preview">
    <span>SQL Preview</span>
    <span class="code">{{sql}}</span>
  </section>
</template>

<script>
import {createSQL} from '../../util/sql_util.js'

export default {
  computed: {
    sql: function () {
      let json = this.$store.state.graphJSON
      return createSQL(json)
    }
  }
}
</script>

<style lang="css">
  .sql-preview {
    display: flex;
    flex-direction: column;
  }

  .code {
    white-space: pre;
    background-color:#EEEEEE;
    font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
  }
</style>
