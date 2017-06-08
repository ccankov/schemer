<template>
  <li @click='sendCurrent'>
    <input v-model='colName'/>
    <ul v-show='isCurrent'>
      <li>
        <select v-model='colType'>
          <option value='integer' checked='colType === "integer"'>Integer</option>
          <option value='string' checked='colType === "string"'>String</option>
          <option value='boolean' checked='colType === "boolean"'>Boolean</option>
        </select>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['id', 'isCurrent', 'graph'],
  name: 'column',
  computed: {
    column: function () {
      return this.graph.getCell(this.id)
    },
    colName: {
      get: function () {
        return this.column.getName()
      },
      set: function (name) {
        this.column.setName(name)
        let nameCell = this.graph.getCell(this.column.embeds()[0])
        nameCell.setName(name)
        nameCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
        this.graph.commit()
      }
    },
    colType: {
      get: function () {
        return this.column.getColType()
      },
      set: function (type) {
        this.column.setColType(type)
        let typeCell = this.graph.getCell(this.column.embeds()[1])
        typeCell.setName(type)
        typeCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
        this.graph.commit()
      }
    }
  },
  methods: {
    sendCurrent: function () {
      this.$emit('send-element', this.column.element)
    }
  }
}
</script>

<style lang="css" scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  span {
    font-size: 10px;
    margin: 20px auto;
  }
</style>
