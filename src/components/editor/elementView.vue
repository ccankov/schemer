<template lang="html">
  <section class='element-view' v-show='currentElement'>
    <header class='element-name'>
      <h2>{{ elementName }}</h2>
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
      <button @click='deleteElement' class="button">
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
  computed: {
    elementName: function () {
      if (this.isTable) {
        return `Table: ${this.currentElement.getName()}`
      } else if (this.isCol) {
        return `Column: ${this.currentElement.getName()}`
      } else {
        return null
      }
    },
    isTable: function () {
      return this.currentElement ? this.currentElement.isTable() : false
    },
    isCol: function () {
      return this.currentElement ? this.currentElement.isCol() : false
    },
    elementType: function () {
      return this.isTable ? 'Table' : 'Column'
    }
  },
  methods: {
    deleteElement: function () {
      const element = this.currentElement

      if (element.isTable()) {
        this.graph.removeTable(element.getId())
      } else if (element.isCol()) {
        this.graph.removeColumn(element.getId())
      }
      this.$emit('deleted-element', element)
    },
    resetPrimaryKey: function (newPrimaryId) {
      this.$emit('reset-primary-key', newPrimaryId)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/app.scss';
  h2 {
    height: 31px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item-label {
      margin-right: 5px;
    }
  }

  .element-view {
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid $light-gray;

    header {
      border-radius: 0;
      font-family: $heading;
    }
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

  .element-details {
    padding: 20px;
    font-family: $heading;

    button {
      display: block;
      border-radius: 5px;
      padding: 5px 20px;
      margin: 0 20px;
      margin-left: 60px;
      font-family: $heading;
      font-size: 14px;
      font-weight: bold;
      background-color: $white;
      color: $accent;
      border-color: $accent;
      border-width: 1px;
      border-style: solid;
    }

    button:hover {
      cursor: pointer;
      color: $white;
      background-color: $light-accent;
    }
  }
</style>
