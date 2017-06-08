import joint from 'jointjs'
import * as JointUtil from './jointjs_util'
import { RECEIVE_GRAPH, UPDATE_GRAPH } from '../store/mutation_types'

class Graph {
  constructor ($store, json = null) {
    this.$store = $store
    this.graph = this.createGraph()
    // If JSON is given, load the table from JSON
    if (json) {
      this.graph.fromJSON(json)
    }

    this.createGraph = this.createGraph.bind(this)
    this.addCells = this.addCells.bind(this)
    this.commitGraph = this.commitGraph.bind(this)
    this.getCell = this.getCell.bind(this)
    this.addTable = this.addTable.bind(this)
    this.addColumn = this.addColumn.bind(this)
    this.toJSON = this.toJSON.bind(this)
    this.stringify = this.stringify.bind(this)

    this.commitGraph()
  }

  createGraph () {
    // Initialize graph
    const graph = new joint.dia.Graph()

    // Handle bounding child elements inside parent element
    graph.on('change:position', (cell, newPosition) => {
      const parentId = cell.get('parent')

      // Move the element if it doesn't have a parent
      if (!parentId) {
        // Avoid collisions with other tables
        let cells = cell.graph.getCells()
        cells.forEach(c => {
          if (c.id === cell.id) {
            return
          }
          if (c.attributes.attrs.nodeType.value === 'table') {
            if (cell.getBBox().intersect(c.getBBox())) {
              cell.set('position', cell.previous('position'))
            }
          }
        })
        return
      }

      // Calculate relative offsets
      let relativePos = cell.position({ parentRelative: true })
      let offsetY = relativePos.y - cell.get('originalPosition').y
      let offsetX = relativePos.x - cell.get('originalPosition').x

      // Reset child position if its relative position has changed
      if (offsetY || offsetX) {
        cell.set('position', cell.previous('position'))
      }

      // Update originalPosition
      cell.set('originalPosition', cell.position({ parentRelative: true }))
    })

    return graph
  }

  addCells (cells) {
    cells.forEach(cell => {
      // Add the current cell to the graph
      this.graph.addCells(cell)

      // Give the cell an originalPosition to bound children inside parents
      cell.set('originalPosition', cell.position({ parentRelative: true }))
    })
    // Update the graph object in the store
    this.commitGraph()
  }

  toJSON () {
    // Convert graph to JSON object
    return this.graph.toJSON()
  }

  stringify () {
    // Convert graph to JSON string
    return JSON.stringify(this.toJSON())
  }

  commit () {
    // Commit the graph to the store
    this.$store.commit(RECEIVE_GRAPH, { graphJSON: this.toJSON() })
  }

  save () {
    // dispatch async action to backend
    this.$store.dispatch(UPDATE_GRAPH, { graphStr: this.stringify() })
  }

  getCell (id) {
    // Get and return the cell with the specified id
    return this.graph.getCell(id)
  }

  addTable (name = 'New Table') {
    // Creates a table with a default name
    let tableCells = JointUtil.createTable(name)

    // Mount the table in the graph object
    this.addCells(tableCells)
  }

  addColumn (table, newColName, type = 'integer') {
    // Create the column on the table
    let colCells = table.attributes.addColumn(newColName, type)

    // Mount the column in the graph object
    this.addCells(colCells)
  }
}

export default Graph
