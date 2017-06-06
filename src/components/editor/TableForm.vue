<template>
  <section class='table-form'>
    <div class='bts'>
      <button @click='addTable'> Add Table </button>
      <button @click='exportSQL'> Export SQL </button>
    </div>

    <span> {{ currentElementName }} </span>
    <ul>
      <li v-for='column in columns'>
        {{ column.attributes.attrs.text.text }}
      </li>
    </ul>
    <!-- current table -->
    <!-- v-for with list of current cols -->
  </section>
</template>

<script>
export default {
  name: 'table-form',
  props: ['currentElement'],
  computed: {
    currentElementName: function () {
      if (this.currentElement) {
        return this.currentElement.attributes.attrs.text.text
      } else {
        return null
      }
    },
    columns: function () {
      if (this.currentElement && this.currentElement.attributes.nodeType === 'table') {
        let columns = this.currentElement.attributes.columns
        console.log(columns[0])
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
