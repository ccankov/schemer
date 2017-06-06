<template lang="html">
  <section class="editor">
    <section class="table-form">
      <!-- Table form component will go here -->
      <table-form :currentElement='currentElement'></table-form>

      <!-- <span>Forms and things</span>
      <br>
      <span>{{ currentElementName }}</span>
      <input v-model="currentElementName"> -->
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
import { createGraph } from '../../util/jointjs_util'
import Paper from './Paper'
import TableForm from './TableForm'
export default {
  components: {
    Paper,
    'table-form': TableForm
  },
  data: function () {
    return {
      graph: createGraph(),
      currentElement: null
    }
  },
  computed: {
    currentElementName: {
      get: function () {
        if (this.currentElement) {
          return this.currentElement.attributes.attrs.text.text
        } else {
          return null
        }
      },
      set: function (val) {
        this.graph.getCell(this.currentElement.id).attr('text', { text: val })
      }
    }
  },
  methods: {
    receiveElement: function (element) {
      this.currentElement = element
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
