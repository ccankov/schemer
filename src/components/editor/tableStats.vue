<template>
  <div class="stats">
    <span class="header">Statistics:</span>
    <p class="stats-line">
      <span>Columns</span>
      <span>{{ columnCount }}</span>
    </p>
    <p class="stats-line">
      <span>Connections</span>
      <span>{{ connectionCount }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['table', 'graph'],
  computed: {
    columnCount: function () {
      return this.table.columns().length
    },
    connectionCount: function () {
      let linkCount = 0
      const colIds = this.table.columns()
      this.graph.getLinks()
        .forEach(link => {
          if (colIds.includes(link.attributes.source.id) ||
           colIds.includes(link.attributes.target.id)) {
            linkCount++
          }
        })
      return linkCount
    }
  }
}
</script>

<style lang="scss">
  .header {
    display: block;
    text-align: left;
    width: 100%;
  }

  .stats-line {
    font-size: 0.8em;
    display: flex;
    padding: 0px 20px;
    justify-content: space-between;
  }

  .stats {
    padding: 10px 0;
  }
</style>
