<template lang="html">
  <div ref="paper" class="paper">

  </div>
</template>

<script>
import joint from 'jointjs'

export default {
  mounted () {
    // Store reference to the Vue element
    const vue = this
    // Pull graph out of props
    const graph = this.graph

    // Define paper
    const paper = new joint.dia.Paper({
      el: this.$refs.paper,
      width: 500,
      height: 500,
      gridSize: 1,
      model: graph
    })

    // When clicking a JointJS element, set it as the current element in Vue
    paper.on('cell:pointerdown',
      (cellView) => {
        vue.currEl = cellView.model.attributes.attrs.text.text
      },
    )

    // Define some basic shapes
    const r1 = new joint.shapes.basic.Rect({
      position: { x: 20, y: 20 },
      size: { width: 200, height: 200 },
      attrs: {
        rect: { fill: '#E74C3C' },
        text: { text: 'Demo Table (Parent)', 'ref-y': 15 }
      }
    })
    const r2 = new joint.shapes.basic.Rect({
      position: { x: 20, y: 60 },
      size: { width: 190, height: 40 },
      attrs: { rect: { fill: '#F1C40F' }, text: { text: 'Col 1 (Child)' } }
    })

    const r3 = new joint.shapes.basic.Rect({
      position: { x: 20, y: 100 },
      size: { width: 190, height: 40 },
      attrs: { rect: { fill: '#F1C40F' }, text: { text: 'Col 2 (Child)' } }
    })

    // Make column elements be inside the table element
    r1.embed(r2)
    r1.embed(r3)

    // Add the cells to the graph (model)
    graph.addCells([r1, r2, r3])

    // Handle bounding child elements inside parent element
    graph.on('change:position', (cell) => {
      const parentId = cell.get('parent')
      if (!parentId) return

      const parent = graph.getCell(parentId)
      const parentBbox = parent.getBBox()
      const cellBbox = cell.getBBox()

      if (parentBbox.containsPoint(cellBbox.origin()) &&
          parentBbox.containsPoint(cellBbox.topRight()) &&
          parentBbox.containsPoint(cellBbox.corner()) &&
          parentBbox.containsPoint(cellBbox.bottomLeft())) {
        // All the four corners of the child are inside
        // the parent area.
        return
      }

      // Revert the child position.
      cell.set('position', cell.previous('position'))
    })
  }
}
</script>

<style lang="css">
</style>
