<template>
  <div class='home'>
    <aside class='controls'>
      <h2> Vue Only </h2>
      <input
      v-model='tableName'
      v-on:keyup.enter='addTable'
      placeholder="new table">

      <h4> Current Element </h4>
      <span> {{ currEl }} </span>
    </aside>
    <section class='editor'>
      <h2> JointJS Only </h2>
      <div ref='paper'></div>
    </section>
  </div>
</template>

<script>
import joint from 'jointjs';

export default {
  name: 'home',
  data: function () {
    return {
      graph: null,
      tableName: '',
      currEl: 'none selected'
    }
  },
  methods: {
    addTable: function() {
      const r4 = new joint.shapes.basic.Rect({
            position: { x: 300, y: 20 },
            size: { width: 200, height: 200 },
            attrs: {
              rect: { fill: '#E74C3C' },
              text: { text: `${this.tableName} Table (Parent)` , 'ref-y': 15 },
            }
        });
      this.graph.addCells(r4);
      this.tableName = ''
    }
  },
  mounted: function () {
    const vue = this;

    const graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
      el: this.$refs.paper,
      width: 650,
      height: 300,
      gridSize: 1,
      model: graph
    });

    paper.on('cell:pointerdown',
      function(cellView, evt, x, y) {
        vue.currEl = cellView.model.attributes.attrs.text.text;
      }
    );

    var r1 = new joint.shapes.basic.Rect({
          position: { x: 20, y: 20 },
          size: { width: 200, height: 200 },
          attrs: {
            rect: { fill: '#E74C3C' },
            text: { text: 'Demo Table (Parent)' , 'ref-y': 15 },
          }
      });
    var r2 = new joint.shapes.basic.Rect({
          position: { x: 20, y: 60 },
          size: { width: 190, height: 40 },
          attrs: { rect: { fill: '#F1C40F' }, text: { text: 'Col 1 (Child)' } }
      });

    var r3 = new joint.shapes.basic.Rect({
          position: { x: 20, y: 100 },
          size: { width: 190, height: 40 },
          attrs: { rect: { fill: '#F1C40F' }, text: { text: 'Col 2 (Child)' } }
      });

    r1.embed(r2);
    r1.embed(r3);
    graph.addCells([r1, r2, r3]);
    window.graph = graph;

    graph.on('change:position', function(cell) {
      var parentId = cell.get('parent');
      if (!parentId) return;

      var parent = graph.getCell(parentId);
      var parentBbox = parent.getBBox();
      var cellBbox = cell.getBBox();

      if (parentBbox.containsPoint(cellBbox.origin()) &&
          parentBbox.containsPoint(cellBbox.topRight()) &&
          parentBbox.containsPoint(cellBbox.corner()) &&
          parentBbox.containsPoint(cellBbox.bottomLeft())) {

          // All the four corners of the child are inside
          // the parent area.
          return;
      }

      // Revert the child position.
      cell.set('position', cell.previous('position'));
    });

    vue.graph = graph
  }
}
</script>

<style lang="css">
  .home {
    display: flex;
  }

  .controls {
    flex: 1;
    padding: 0 20px;
    border-right: 1px solid black
  }

  .editor {
    flex: 5;
  }
</style>
