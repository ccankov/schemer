<template lang="html">
  <section class="editor">
    <section class="table-form">
      <button @click='saveGraph'>Save Graph to DB</button>

      <!-- Table form component will go here -->
      <span>Forms and things</span>
      <br>
      <span>{{ currentElementName }}</span>
      <input v-model="currentElementName">
    </section>
    <section class="body">
      <Paper :graph="graph" v-on:send-element="receiveElement"></Paper>
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
import { createGraph, getElementName } from '../../util/jointjs_util'
import { RECEIVE_GRAPH, UPDATE_GRAPH } from '../../store/mutation_types'
import Paper from './Paper'
export default {
  components: {
    Paper
  },
  data: function () {
    return {
      graph: null,
      currentElement: null
    }
  },
  computed: {
    currentElementName: {
      get: function () {
        return getElementName(this.currentElement)
      },
      set: function (val) {
        this.graph.getCell(this.currentElement.id).attr('text', { text: val })
        this.commitGraph()
      }
    }
  },
  methods: {
    receiveElement: function (element) {
      this.currentElement = element
    },
    commitGraph: function () {
      this.$store.commit(RECEIVE_GRAPH, { graph: this.graph })
    },
    saveGraph: function () {
      this.$store.dispatch(UPDATE_GRAPH, { graph: this.graph })
    }
  },
  created () {
    this.graph = createGraph()
    this.commitGraph()
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

  .table-form {
    flex: 1.5;
  }

  .body {
    border: 1px solid black;
    flex: 5;
    display: flex;
    flex-direction: column;
  }

  .additional-info {
    display: flex;
  }

  .additional-info > section {
    border: 1px solid black;
    flex: 1;
  }
</style>
