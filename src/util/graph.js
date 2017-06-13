import joint from 'jointjs'
import * as JointUtil from './jointjs_util'
import { RECEIVE_GRAPH, UPDATE_GRAPH } from '../store/mutation_types'
import Cell from './cell'
import { languageTypes } from './sql_lang_constants'

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

  loadJSON (graph) {
    this.graph.fromJSON(graph)
    this.getTables().forEach(
      tableCell => {
        tableCell.bindTableMethods()
        this.getColumns(tableCell.getId())
          .forEach(colCell => colCell.bindColumnMethods())
      }
    )

    this.commit()
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
    return this.getCell(tableId) // Cell object
      .columns() // array of ids
      .map(colId => this.getCell(colId)) // array of Cell objects
  }

  getTableTree () {
    return this.getTables()
      .map(tableCell => ({
        id: tableCell.getId(),
        name: tableCell.getName(),
        cols: this.getColumns(tableCell.getId())
            .map(colCell => ({
              id: colCell.getId(),
              name: colCell.getName()
            }))
      })
    )
  }

  getCreatePosition () {
    const tables = this.getTables()
    let maxX = 20
    tables.forEach(table => {
      if (table.element.attributes.position.x > maxX) {
        maxX = table.element.attributes.position.x
      }
    })
    return maxX
  }

  addTable (name = 'New Table') {
    let maxX = this.getCreatePosition()

    // Creates a table with a default name
    let tableCells = JointUtil.createTable(name, maxX)

    // Mount the table in the graph object
    this.addCells(tableCells)

    // add default columns
    const colTypes = languageTypes[this.$store.state.graphJSON.sqlLang]

    this.addColumn(tableCells[0], 'id', colTypes[0], { primaryKey: true })
    this.addColumn(tableCells[0], 'created_at', colTypes[1])
    this.addColumn(tableCells[0], 'updated_at', colTypes[1])

    return tableCells[0]
  }

  addColumn (table, newColName = 'New Column', type, options = {}) {
    if (!type) {
      type = languageTypes[this.$store.state.graphJSON.sqlLang][0]
    }

    // Create the column on the table
    let colCells = table.attributes.addColumn(newColName, type, options)

    // Mount the column in the graph object
    this.addCells(colCells)
    return colCells[0]
  }
  removeColumn (colId) {
    const col = this.getCell(colId)
    if (col.isCol()) {
      const parentId = col.parentId()
      const table = this.graph.getCell(parentId)
      // Delete the column with the specified id
      table.attributes.removeColumn(colId)
      this.commit()
    }
  }
  removeTable (tableId) {
    const table = this.getCell(tableId)
    if (table.isTable()) {
      this.graph.removeCells(table.element)
      this.commit()
    }
  }
}

export default Graph
