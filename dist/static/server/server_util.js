
export const parseJson = (json) => {
  let cells = json.cells // array of table Objects
  let tableArray = [];
  let columnObject = {}
  cells.forEach(cell => {
    if (cell.nodeType === 'column') {
      columnObject[cell.id] = cell
    }
  })
  cells.forEach(cell => {
    if (cell.nodeType === 'table') {
      let tableCols = cell.columns.map(colId => {
        let booleans = []
        columnObject[colId].options.allowNull ? null : booleans.push('NOT NULL')
        columnObject[colId].options.unique ? booleans.push('UNIQUE') : null
        columnObject[colId].options.primaryKey ? booleans.push('PRIMARY KEY') : null
        return {
          // [colId]:
          name: columnObject[colId].attrs.text.text,
          options: {
            boolean: booleans,
            variable: {
              default: columnObject[colId].options.defaultVal,
              check: null // TODO: implement on front end
            }
          }
        }
      })
      tableArray.push({
        name: cell.attrs.text.text,
        columns: tableCols
      })
    }
  })
  return tableArray
}

export const createSQL = (json) => {
  tables = parseJson(json)

}
