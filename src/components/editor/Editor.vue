<template lang="html">
  <section class="editor">
    <section class="table-form">
      <!-- Table form component will go here -->
      <span>Forms and things</span>
    </section>
    <section class="body">
      <Paper></Paper>
      <!-- <Paper :graph="graph"></Paper> -->
      <section class="additional-info">
        <section class="statistics">
          <!-- Statistics will go here -->
          <span>Statistics</span>
        </section>

        <section class="preview">
          <!-- SQL Preview will go here -->
          <span>SQL Preview</span>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import joint from 'jointjs'
import Paper from './Paper'
export default {
  components: {
    Paper
  },
  data: function () {
    return {
      graph: new joint.dia.Graph().fromJSON(this.$store.state.graph)
    }
  }
}
</script>

<style lang="css">
  .editor {
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }

  .body {
    border: 1px solid black;
    flex: .6;
    display: flex;
    flex-direction: column;
  }

  .additional-info {
    display: flex;
  }
</style>
