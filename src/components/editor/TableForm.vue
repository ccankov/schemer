<template>
  <section class='table-form'>
    <div class='bts'>
      <button @click='addTable'> Add Table </button>
      <button @click='exportSQL'> Export SQL </button>
    </div>

    <span> {{ currentTable }} </span>
    <ul>
      <li v-for='column in columns'>
        {{ getElementName(column) }}
      </li>
    </ul>
    <!-- current table -->
    <!-- v-for with list of current cols -->
  </section>
</template>

<script>
import { getElementName, getElementType } from '../../util/jointjs_util'

export default {
  name: 'table-form',
  props: ['currentElement'],
  computed: {
    currentTable: function () {
      if (getElementType(this.currentElement) === 'table') {
        return getElementName(this.currentElement)
      } else {
        return null
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
