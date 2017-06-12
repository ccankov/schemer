<template lang="html">
  <section class='element-view' v-show='currentElement'>
    <header class='element-name'>
      <h2 v-if='editName'>
        <input v-model='elementName' placeholder='Name this element'/>
      </h2>
      <h2 v-else='editName'>{{ elementName }}</h2>
      <i @click='toggleEdit' class='edit fa fa-pencil'></i>
    </header>
    <div class='element-details'>
      <tableStats v-if='isTable' :table='currentElement' :graph='graph'>
      </tableStats>
      <colOptions
        v-if='isCol'
        :column='currentElement'
        :graph='graph'
        @reset-primary-key='resetPrimaryKey'>
      </colOptions>
      <button @click='deleteElement'>
        Delete {{ isTable ? 'Table' : 'Column'}}</button>
    </div>
  </section>
</template>

<script>
import tableStats from './tableStats'
import colOptions from './colOptions'

export default {
  props: ['currentElement', 'graph'],
  components: { tableStats, colOptions },
  data: () => ({
    editName: false
  }),
  computed: {
    isTable: function () {
      return this.currentElement ? this.currentElement.isTable() : false
    },
    isCol: function () {
      return this.currentElement ? this.currentElement.isCol() : false
    },
    elementName: {
      get: function () {
        if (!this.currentElement) return null
        return this.currentElement.getName()
      },
      set: function (name) {
        this.currentElement.setName(name)

        if (this.currentElement.isCol()) {
          let nameCell = this.graph.getCell(this.currentElement.embeds()[0])
          nameCell.setName(name)
          nameCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
        }
        this.graph.commit()
      }
    }
  },
  methods: {
    toggleEdit: function () {
      this.editName = !this.editName
    },
    deleteElement: function () {
      if (this.currentElement.isTable()) {
        this.graph.removeTable(this.currentElement.getId())
      } else if (this.currentElement.isCol()) {
        this.graph.removeColumn(this.currentElement.getId())
      }
    },
    resetPrimaryKey: function (newPrimaryId) {
      this.$emit('reset-primary-key', newPrimaryId)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/app.scss';

  .element-view {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }

  .element-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba($light-accent, 0.3);
  }

  .element-name h2 {
    padding: 5px 0;
    margin: 0;
    font-size: 14px;
  }

  .edit:hover {
    cursor: pointer;
  }
</style>
