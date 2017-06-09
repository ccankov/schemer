<template lang="html">
  <section class="statistics">
    <!-- Statistics will go here -->
    <span class="header">Statistics</span>
    <div class="stats">
      <p class="stats-line">
        <span>Tables</span>
        <span>{{ tableCount }}</span>
      </p>
      <p class="stats-line">
        <span>Columns</span>
        <span>{{ columnCount }}</span>
      </p>
      <p class="stats-line">
        <span>Connections</span>
        <span>{{ connectionCount }}</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    tableCount: function () {
      return this.countType('table')
    },
    columnCount: function () {
      return this.countType('column')
    },
    connectionCount: function () {
      return this.countType('link')
    }
  },
  methods: {
    countType: function (type) {
      let cells = this.$store.state.graphJSON.cells
      return cells.filter((cell) => {
        return cell.attrs.nodeType.value === type
      }).length
    }
  }
}
</script>

<style lang="css">
  .statistics {
    border: 1px solid black;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .header {
    font-weight: bold;
    border-top: 1px solid black;
    border-bottom: 2px solid black;
    background-color: #BBB;
    color: #000;
  }

  .stats {
    margin: 0;
    background-color:#EEE;
    height: 100%;
  }

  .stats-line {
    margin: 0;
    display: flex;
    line-height: 2;
    justify-content: space-between;
    padding: 0 20px;
  }
</style>
