<template>
  <li
    @click='$emit("hey")'>
    <input v-model='colName'/>
    <ul v-show='isCurrent'>
      <span> Col Options go here </span>
    </ul>
  </li>
</template>

<script>
import { getElementName, setElementName } from '../../util/jointjs_util'
export default {
  props: ['column', 'isCurrent'],
  name: 'column',
  computed: {
    colName: {
      get: function () {
        return getElementName(this.column)
      },
      set: function (val) {
        setElementName(this.column, val)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  ul {
    list-style: none;
  }
  span {
    font-size: 10px;
    margin: 20px auto;
  }
</style>
