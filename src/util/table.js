import Cell from './cell'

class Table extends Cell {
  columns () {
    this.element.attributes.attrs.columns.value
  }
}

export default Table
