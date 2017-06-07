<template>
  <section class='table-form'>
    <div class='bts'>
      <button @click='addTable'> Add Table </button>
      <button @click='exportSQL'> Export SQL </button>
    </div>

    <span> {{ currentTable }} </span>
    <ul>
      <table-form-column
        v-for='id in columns'
        key='id'
        :isCurrent='currentElement.id === id'
        :column='getCell(id)'>
      </table-form-column>
    </ul>
    <!-- current table -->
    <!-- v-for with list of current cols -->
  </section>
</template>

<script>
import { getElementName, getElementType, getParentId } from '../../util/jointjs_util'
import TableFormColumn from './TableFormColumn'

export default {
  name: 'table-form',
  props: ['currentElement', 'graph'],
  components: {
    'table-form-column': TableFormColumn
  },
  computed: {
    currentTable: function () {
      if (getElementType(this.currentElement) === 'table') {
        return getElementName(this.currentElement)
      } else {
        console.log(this.currentElement)
        let parentId = getParentId(this.currentElement)
        return getElementName(this.getCell(parentId))
      }
    },
    columns: function () {
      if (getElementType(this.currentElement) === 'table') {
        return this.currentElement.attributes.columns
      } else {
        return []
      }
    }
  },
  methods: {
    getCell: function (id) {
      return this.graph.getCell(id)
    },
    addTable: function () {
      console.log('nothing yet!')
    },
    exportSQL: function () {
      console.log('nothing yet!')
    }
  }
}
</script>

<style lang="css">
</style>
