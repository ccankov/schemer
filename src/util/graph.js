import joint from 'jointjs'
import * as JointUtil from './jointjs_util'
import { RECEIVE_GRAPH, UPDATE_GRAPH } from '../store/mutation_types'
import Cell from './cell'

// source code for joint.dia.Graph is in:
// node_modules/jointjs/src/joint.dia.graph.js

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
    this.commit = this.commit.bind(this)
    this.getCell = this.getCell.bind(this)
    this.addTable = this.addTable.bind(this)
    this.addColumn = this.addColumn.bind(this)
    this.removeColumn = this.removeColumn.bind(this)
    this.toJSON = this.toJSON.bind(this)
    this.stringify = this.stringify.bind(this)
    this.getLinks = this.getLinks.bind(this)

    this.commit()
  }

  createGraph () {
    // Initialize graph
    const graph = new joint.dia.Graph()
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
    this.commit()
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
    return new Cell(this.graph.getCell(id))
  }

  getCells () {
    return this.graph.getCells()
      .map(cell => new Cell(cell))
  }

  getLinks () {
    return this.graph.getCells().filter(cell => cell.attributes.type === 'link')
  }

  getTables () {
    return this.getCells().filter(cell => cell.isTable())
  }

  getColumns (tableId) {
    this.getCell(tableId) // Cell object
      .columns() // array of ids
      .map(colId => this.getCell(colId)) // array of Cell objects
  }

  addTable (name = 'New Table') {
    // Creates a table with a default name
    let tableCells = JointUtil.createTable(name)

    // Mount the table in the graph object
    this.addCells(tableCells)
    return tableCells[0]
  }
  addColumn (table, newColName, type = 'integer', options = {}) {
    // Create the column on the table
    let colCells = table.attributes.addColumn(newColName, type, options)

    // Mount the column in the graph object
    this.addCells(colCells)
    return colCells[0]
  }
  removeColumn (table, colId) {
    // Delete the column with the specified id
    table.attributes.removeColumn(colId)
    this.commit()
  }
}

export default Graph
