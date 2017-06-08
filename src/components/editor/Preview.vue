<template lang="html">
  <section class="sql-preview">
    <span>SQL Preview</span>
    <pre>
      <code class="code">{{sql}}</code>
    </pre>
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

  pre {
    display: flex;
    background-color:#EEEEEE;
    margin: 0;
    overflow-y: scroll;
    height: 100%;
  }

  .code {
    text-align: left;
    margin: 0;
    white-space: pre;
  }
</style>
