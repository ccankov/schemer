<template>
  <li @click='sendCurrent'>
    <input v-model='colName'/>
    <ul v-show='isCurrent'>
      <span> Col Options go here </span>
    </ul>
  </li>
</template>

<script>
import { getElementName } from '../../util/jointjs_util'
export default {
  props: ['column', 'isCurrent'],
  name: 'column',
  computed: {
    colName: {
      get: function () {
        return getElementName(this.column)
      },
      set: function (val) {
        console.log(this.column)
        console.log(val)
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
