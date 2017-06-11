<template>
  <ul class='table-list'>
    <li
      class='table-item'
      v-for='table in tables'>
      {{ table.name }}
      <ul
        class='col-list'
        v-show='currentTableId === table.id'>
        <li
          class='col-item'
          v-for='col in table.cols'>
            {{ col.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['graph', 'currentElement'],
  computed: {
    currentTableId: function () {
      if (!this.currentElement) return null
      if (this.currentElement.isTable()) {
        return this.currentElement.getId()
      } else {
        let parent = this.graph.getCell(this.currentElement.parentId())
        if (parent.isTable()) {
          return parent.getId()
        } else {
          return null
        }
      }
    },
    tables: function () {
      return this.graph.getTableTree()
    }
  }
}

</script>

<style lang="css">
</style>
