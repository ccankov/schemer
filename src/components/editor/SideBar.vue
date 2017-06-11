<template lang="html">
  <section class='side-bar'>
    <tree-view
      :currentElement='currentElement'
      :graph='graph'></tree-view>
    <element-view
      :currentElement='currentElement'
      :graph='graph'></element-view>
  </section>
</template>

<script>
import treeView from './treeView'
import elementView from './elementView'

export default {
  props: ['graph', 'currentElement'],
  components: {
    'tree-view': treeView,
    'element-view': elementView
  }
}
</script>

<style lang="css">
</style>
