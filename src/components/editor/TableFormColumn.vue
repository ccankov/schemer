<template>
  <li @click='sendCurrent'>
    <input v-model='colName'/>
    <ul v-show='isCurrent'>
      <span> Col Options go here </span>
    </ul>
  </li>
</template>

<script>
import { RECEIVE_GRAPH } from '../../store/mutation_types'

export default {
  props: ['id', 'isCurrent', 'graph'],
  name: 'column',
  computed: {
    column: function () {
      return this.graph.getCell(this.id)
    },
    colName: {
      get: function () {
        if (this.column) {
          return this.column.attributes.attrs.nodeName.value
        } else {
          return ''
        }
      },
      set: function (val) {
        let textVal = val
        if (val.length > 10) textVal = val.substring(0, 10) + '...'
        this.column.attr('nodeName', { value: val })
        let shapeCell = this.graph.getCell(
          this.column.attributes.embeds[0]
        )
        shapeCell.attr('text', { text: textVal, 'ref-x': 0.5, 'ref-y': 0.3 })
        shapeCell.attr('nodeName', { value: val })
        this.$store.commit(RECEIVE_GRAPH, { graph: this.graph })
      }
    }
  },
  methods: {
    sendCurrent: function () {
      this.$emit('send-element', this.column)
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
