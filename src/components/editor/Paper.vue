<template lang="html">
  <section class="paper-container">
    <div ref="paper" class="paper"></div>
    <span class='errors' v-show='errors'>{{ errors }}</span>
  </section>
</template>

<script>
import '../../assets/joint.css'
import { createPaper } from '../../util/jointjs_util'

export default {
  props: ['graph'],
  data () {
    return {
      paper: null
    }
  },
  computed: {
    errors: function () {
      if (this.$store.state.errors.length !== 0) {
        return this.$store.state.errors.join(', ')
      } else {
        return null
      }
    }
  },
  mounted () {
    // Set up paper
    this.paper = createPaper(this.$refs.paper, this.graph, this)
    // Define sample table with two columns
    const usersTable = this.graph.addTable('users')
    this.graph.addColumn(usersTable, 'id', 'integer', { 'primaryKey': true, 'notNull': false })
    this.graph.addColumn(usersTable, 'username', 'string', { 'notNull': false })
  }
}
</script>

<style lang="css">
  .paper-container{
    height: 100%;
    width: 100%;
    max-width: initial;
    overflow: scroll;
    margin-bottom: 5px;
  }

  .paper {
    height: 100%;
  }

  .joint-paper {
    overflow: hidden;
  }

  .col-text {
    font-size: 12px;
  }

  .column-rect {
    cursor: pointer;
  }

  .column-rect + .label{
    cursor: pointer;
  }

  .header-rect {
    cursor: default;
  }

  .header-rect + .label{
    cursor: default;
  }

  .header-text {
    font-weight: bold;
    font-size: 12px;
  }

  .available-magnet {
    fill: yellow;
  }

  .errors {
    background: red;
    color: white;
    border-radius: 5px;
    font-weight: 700;
    position: absolute;
    bottom: 25%;
    left: 48%;
    transform: translateX(50%);
    padding: 5px;
    text-transform: uppercase;
  }
</style>
