<template lang="html">
  <section class="paper-container">
    <div ref="paper" class="paper"></div>
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
  mounted () {
    // Set up paper
    this.paper = createPaper(this.$refs.paper, this.graph.graph, this)
    window.paper = this.paper
    // Define sample table with two columns
    const usersTable = this.graph.addTable('users')
    this.graph.addColumn(usersTable, 'id', 'integer', { 'primary key': true, 'allow null': false })
    this.graph.addColumn(usersTable, 'username', 'string', { 'allow null': false })
  }
}
</script>

<style lang="scss">
  .paper-container{
    height: 550px;
    width: 100%;
    max-width: initial;
    overflow: scroll;
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
</style>
