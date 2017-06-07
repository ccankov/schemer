<template>
  <section class='table-form'>
    <div class='bts'>
      <button @click='addTable'> Add Table </button>
      <button @click='exportSQL'> Export SQL </button>
    </div>

    <h3> Current Element: </h3>
    <ul class='el-list'>
      <li>
        <input
          v-model='currentTableName'/>
      </li>
      <table-form-column
        v-for='id in columns'
        key='id'
        :isCurrent='currentElement.id === id'
        :column='getCell(id)'>
      </table-form-column>
      <li>
        <input
          v-model='newColName'
          placeholder='Add a column' />
      </li>
    </ul>
  </section>
</template>

<script>
import { getElementName, setElementName, isTable, getParentId } from '../../util/jointjs_util'
import TableFormColumn from './TableFormColumn'

export default {
  name: 'table-form',
  props: ['currentElement', 'graph'],
  components: {
    'table-form-column': TableFormColumn
  },
  data: () => ({
    newColName: ''
  }),
  computed: {
    currentTable: function () {
      if (isTable(this.currentElement)) {
        return this.currentElement
      } else {
        let parent = this.getCell(getParentId(this.currentElement))
        if (isTable(parent)) {
          return parent
        } else {
          return null
        }
      }
    },
    currentTableName: {
      get: function () {
        return getElementName(this.currentTable)
      },
      set: function (val) {
        setElementName(this.getCell(this.currentTable.id), val)
      }
    },
    columns: function () {
      if (this.currentTable) {
        return this.currentTable.attributes.columns
      } else {
        return []
      }
    }
  },
  methods: {
    getCell: function (id) {
      return this.graph.getCell(id)
    },
    setCurrent: function (id) {
      console.log('setting current')
      this.currentElement = this.getCell(id)
    },
    addTable: function () {
      console.log('nothing yet!')
    },
    addColumn: function () {
    },
    exportSQL: function () {
      console.log('nothing yet!')
    }
  }
}
</script>

<style lang="css">
  .table-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .table-form h3 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    text-align: left;
  }

  .el-list {
    width: 100%;
    padding: 0 10px;
    list-style: none;
  }

  .el-list li {
    width: 100%;
    border: 1px solid black;
    box-sizing: border-box;
  }

  .el-list input {
    width: 80%;
    height: 100%;
    padding: 5px;
    border: none;
    margin: 0;
  }
</style>
