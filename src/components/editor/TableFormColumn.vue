<template>
  <li @click='sendCurrent'>
    <label> Column:
      <input v-model='colName'/>
    </label>
    <div class='col-options' v-show='isCurrent'>

      <label>Type:
        <select v-model='colType'>
          <option
            v-for='type in colTypes'
            :value='type'
            selected='colType.toLowerCase().startsWith(type)'>
            {{ type }}
          </option>
        </select>
        <input v-show='customType' :value='customType' @keyup.enter='setCustomType'/>
      </label>

      <label>Primary Key:
        <input type="checkbox" value="primaryKey" v-model="colOptions">
      </label>
      <label>not NULL:
        <input type="checkbox" value="notNull" v-model="colOptions">
      </label>
      <label>Unique:
        <input type="checkbox" value="unique" v-model="colOptions">
      </label>
      <label>Indexed:
        <input type="checkbox" value="indexed" v-model="colOptions">
      </label>

    </div>
  </li>
</template>

<script>
// col deletion
// table deletion
//

// text inputs
// float, var*

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
    },
    colTypes: function () {
      return this.languageTypes[this.$store.state.graphJSON.sqlLang]
    },
    customType: function () {
      const lowerColType = this.colType.toLowerCase()
      if (lowerColType.startsWith('float') ||
            lowerColType.startsWith('var')) {
        const reg = lowerColType.match(/.*\((\d+)\).*/)
        return reg ? reg[1] : '16'
      } else {
        return null
      }
    }
  },
  methods: {
    sendCurrent: function () {
      this.$emit('send-element', this.column.element)
    },
    setCustomType: function (e) {
      this.colType = `${this.colType}(${e.target.value})`
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
