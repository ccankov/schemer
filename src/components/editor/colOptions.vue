<template>
  <div class='col-options'>
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

    <label
      v-for='opt in Object.keys(colOptions)'> {{ opt }}
      <input
        type='checkbox'
        :name='opt'
        :checked='colOptions[opt]'
        :disabled="primaryKeyChecked(opt)"
        @click='toggleColOption'>
    </label>
  </div>
</template>

<script>

export default {
  props: ['column', 'graph'],
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
    colOptions: function () {
      let options = this.column.getColOptions()
      delete options.default
      return options
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
    },
    primaryKeyChecked: function (opt) {
      return (this.colOptions.primaryKey && opt !== 'primaryKey')
    },
    toggleColOption: function (event) {
      const opt = event.target.name
      const currOption = this.colOptions[opt]
      const options = this.column.setColOptions({ [opt]: !currOption })

      const optionsStr = Object.keys(options)
        .filter(opt => options[opt]).join(', ')

      let optionsCell = this.graph.getCell(this.column.embeds()[2])
      optionsCell.setName(optionsStr)
      optionsCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})

      // reset all other primary keys if a primary key is checked
      if (opt === 'primaryKey' && !currOption) {
        this.$emit('reset-primary-key', this.column.element.id)
      }
      this.graph.commit()
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
