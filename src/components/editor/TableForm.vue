<template>
  <section class='table-form'>
    <div class='bts'>
      <button @click='addTable'> Add Table </button>
      <button @click='exportSQL'> Export SQL </button>
    </div>

    <h3> Current Element: </h3>
    <ul class='el-list' v-if='currentElement'>
      <li>
        <input v-model='currentTableName'/>
      </li>
      <table-form-column
        v-for='id in columns'
        key='id'
        :id='id'
        :isCurrent='currentElement.id === id'
        :graph='graph'
        v-on:send-element='sendElement'>
      </table-form-column>
      <li>
        <input
          v-model='newColName'
          v-on:keyup.enter='addColumn'
          placeholder='Add a column' />
      </li>
    </ul>
    <span v-else='currentElement'> Nothing Selected </span>
  </section>
</template>

<script>
import {
  getElementName,
  setElementName,
  isTable,
  getParentId
} from '../../util/jointjs_util'
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
        setElementName(this.currentTable, val)
        this.currentTable.attr('nodeName', { value: val })
        this.graph.commit()
      }
    },
    columns: function () {
      if (this.currentTable) {
        return this.currentTable.attributes.attrs.columns.value
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
      this.graph.addTable()
    },
    addColumn: function () {
      // optional argument for type - defaults to integer
      this.graph.addColumn(this.currentTable, this.newColName)
      this.newColName = ''
    },
    sendElement: function (element) {
      this.$emit('send-element', element)
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
