<template lang="html">
  <section class="sql-preview">
    <span class="header">SQL Preview</span>
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
    padding: 3px;
    margin: 0;
    overflow-y: scroll;
    height: 100%;
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
