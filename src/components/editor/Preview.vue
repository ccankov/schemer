<template lang="html">
  <section class="sql-preview">
    <span>SQL Preview</span>
    <span class="code">{{sql}}</span>
  </section>
</template>

<script>
export default {
  props: ['sql']
}
</script>

<style lang="css">
  .sql-preview {
    flex: 1;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }

  .code {
    white-space: pre;
    background-color:#EEEEEE;
    font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
  }
</style>
