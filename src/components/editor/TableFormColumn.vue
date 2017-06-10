<template>
  <li @click='sendCurrent'>
    <label> Column:
      <input v-model='colName'/>
    </label>
    <div class='col-options' v-show='isCurrent'>
        <label>Type:
          <div class='type'>
          <select v-model='baseType'>
            <option
              v-for='type in colTypes'
              :value='type'>
              {{ type }}
            </option>
          </select>
          <input
          class='custom-type'
          v-show='customType'
          :value='customType'
          @keyup.enter='setCustomType'/>
        </div>
        </label>


      <!-- disable last 3 if primarKey checked -->
      <label>Primary Key:
        <input
          type="checkbox"
          value="primaryKey"
          v-model="colOptions">
      </label>
      <label>not NULL:
        <input
          type="checkbox"
          value="notNull"
          :disabled="isPrimaryKey"
          v-model="colOptions">
      </label>
      <label>Unique:
        <input
          type="checkbox"
          value="unique"
          :disabled="isPrimaryKey"
          v-model="colOptions">
      </label>
      <label>Indexed:
        <input
          type="checkbox"
          value="indexed"
          :disabled="isPrimaryKey"
          v-model="colOptions">
      </label>
      <button @click='$emit("remove-column",column.element.id)'>Delete Column</button>
    </div>
  </li>
</template>

<script>
// col deletion
// table deletion

export default {
  props: ['id', 'isCurrent', 'graph'],
  name: 'column',
  data: () => ({
    languageTypes: {
      'postgreSQL': ['varchar', 'text', 'varbit', 'integer', 'float', 'serial', 'boolean', 'date', 'timestamp'],
      'access': ['text', 'memo', 'byte', 'integer', 'long', 'single', 'double', 'currency', 'autoNumber', 'data/time', 'yes/no', 'OleObject', 'hyperlink'],
      'mySQL': ['VARCHAR', 'TEXT', 'BLOB', 'INT', 'FLOAT', 'DATETIME', 'TIMESTAMP'],
      'SQL Server': ['varchar', 'text', 'bit', 'int', 'float', 'money', 'datetime', 'timestamp'],
      'oracle': ['VARCHAR2', 'LONG', 'DATE', 'BINARY FLOAT', 'TIMESTAMP', 'ROWID', 'BLOB', 'CLOB', 'BFILE']
    }
  }),
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
    },
    colTypes: function () {
      return this.languageTypes[this.$store.state.graphJSON.sqlLang]
    },
    baseType: {
      get: function () {
        return this.column.getColType().split('(')[0]
      },
      set: function (type) {
        this.setColType(type)
      }
    },
    customType: function () {
      const lowerColType = this.column.getColType().toLowerCase()
      if (lowerColType.startsWith('float') ||
            lowerColType.startsWith('var')) {
        const reg = lowerColType.match(/.*\((\d+)\).*/)
        return reg ? reg[1] : '16'
      } else {
        return null
      }
    },
    isPrimaryKey: function () {
      return this.colOptions.includes('primaryKey')
    }
  },
  methods: {
    sendCurrent: function () {
      this.$emit('send-element', this.column.element)
    },
    setColType: function (type) {
      this.column.setColType(type)
      let typeCell = this.graph.getCell(this.column.embeds()[1])
      typeCell.setName(type)
      typeCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
      this.graph.commit()
    },
    setCustomType: function (event) {
      this.setColType(`${this.baseType}(${event.target.value})`)
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

  .custom-type {
    max-width: 20px;
  }

  span {
    font-size: 10px;
    margin: 20px auto;
  }
</style>
