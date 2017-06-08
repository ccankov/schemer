<template lang="html">
  <section class="statistics">
    <!-- Statistics will go here -->
    <span>Statistics</span>
    <div class="stats">
      <p class="stats-line">
        <span>Tables</span>
        <span>{{ json.length }}</span>
      </p>
      <p class="stats-line">
        <span>Columns</span>
        <span>{{ columnCount }}</span>
      </p>
      <p class="stats-line">
        <span>Connections</span>
        <span>0</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['json'],
  computed: {
    columnCount: function () {
      return this.json.reduce((acc, table) => acc + table.columns.length, 0)
    }
  }
}
</script>

<style lang="css">
  .statistics {
    border: 1px solid black;
    flex: 1;
  }

  .stats {
    margin: 0;
    background-color:#EEEEEE;
  }

  .stats-line {
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
</style>
