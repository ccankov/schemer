<template>
  <ul class='table-list'>
    <li class='table-item'
      v-for='table in tables'>
      <label :class='elClass(table)'>
        <span>
          <i class='fa fa-folder-open-o'></i>
          <span>{{ table.name }}</span>
        </span>
        <i
          class='col-btn fa fa-plus'
          @click='addColumn'></i>
      </label>
      <ul class='col-list'
        v-show='currentTableId === table.id'>
        <li
          class='col-item'
          v-for='col in table.cols'>
            <label :class='elClass(col)'>
              <span>
                <i class='fa fa-file-text-o'></i>
                <span>{{ col.name }}</span>
              </span>
            </label>
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
    },
    tables: function () {
      return this.graph.getTableTree()
    }
  },
  methods: {
    elClass: function (element) {
      const currId = this.currentElement ? this.currentElement.getId() : null
      return element.id === currId ? 'current-element' : ''
    },
    addColumn: function () {
      const newCol = this.graph.addColumn(this.currentTable.element)
      this.sendElement(newCol)
    },
    sendElement: function (element) {
      this.$emit('send-element', element)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '../../assets/app.scss';

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  label > span:hover, .col-btn:hover {
    cursor: pointer;
  }

  .table-list {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .table-list label {
    display: flex;
    justify-content: space-between;
  }

  .col-list {
    margin-left: 30px;
  }

  .col-item {
    padding: 2px 5px;
  }

  .current-element {
    background: $light-blue;
  }

</style>
