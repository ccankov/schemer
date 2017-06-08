<template>
  <li @click='sendCurrent'>
    <input v-model='colName'/>
    <div class='col-options' v-show='isCurrent'>

      <label>Type:
        <select v-model='colType'>
          <option value='integer' checked='colType === "integer"'>Integer</option>
          <option value='string' checked='colType === "string"'>String</option>
          <option value='boolean' checked='colType === "boolean"'>Boolean</option>
        </select>
      </label>

      <label>Primary Key:
        <input type="checkbox" value="primary key" v-model="colOptions">
      </label>
      <label>not NULL:
        <input type="checkbox" value="not NULL" v-model="colOptions">
      </label>
      <label>Unique:
        <input type="checkbox" value="unique" v-model="colOptions">
      </label>
      <label>Indexed:
        <input type="checkbox" value="indexed" v-model="colOptions">
      </label>

      <span> {{ colOptions.toString() }} </span>
    </div>
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
    },
    colOptions: {
      get: function () {
        return this.column.getColOptions()
      },
      set: function (options) {
        this.column.setColOptions(options)
        let optionsCell = this.graph.getCell(this.column.embeds()[2])
        optionsCell.setName(options.toString())
        optionsCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
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
  .col-options {
    padding: 7px;
    display: flex;
    flex-direction: column;
  }

  .col-options label {
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 10px;
    margin: 20px auto;
  }
</style>
