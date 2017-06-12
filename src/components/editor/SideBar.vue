<template lang="html">
  <section class='side-bar'>
    <tree-view
      :currentElement='currentElement'
      :currentTableId='currentTableId'
      :graph='graph'
      @send-element='sendElement'
      @add-column='addColumn'
      ></tree-view>
    <element-view
      :currentElement='currentElement'
      :graph='graph'
      @send-element='sendElement'></element-view>
  </section>
</template>

<script>
import treeView from './treeView'
import elementView from './elementView'

export default {
  props: ['graph', 'currentElement'],
  components: {
    'tree-view': treeView,
    'element-view': elementView
  },
  computed: {
    currentTableId: function () {
      return this.currentTable ? this.currentTable.getId() : null
    },
    currentTable: function () {
      if (!this.currentElement) return null
      if (this.currentElement.isTable()) {
        return this.currentElement
      } else {
        let parent = this.graph.getCell(this.currentElement.parentId())
        if (parent.isTable()) {
          return parent
        } else {
          return null
        }
      }
    }
  },
  methods: {
    addColumn: function (tableId) {
      const table = this.graph.getCell(tableId)
      const newCol = this.graph.addColumn(table.element)
      this.sendElement(newCol)
    },
    sendElement: function (element) {
      this.$emit('send-element', element)
    }
  }
}
</script>

<style lang="css">
  .side-bar {
    width: 100%;
  }
</style>
