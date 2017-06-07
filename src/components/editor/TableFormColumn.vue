<template>
  <li>
    {{ colName }}
  </li>
</template>

<script>
import { getElementName } from '../../util/jointjs_util'
export default {
  props: ['column'],
  name: 'column',
  computed: {
    colName: function () {
      return getElementName(this.column)
    }
  }
}
</script>

<style lang="css">
</style>
