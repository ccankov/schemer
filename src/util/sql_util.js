export const parseJson = (json) => {
  let cells = json.cells // array of table Objects
  let tableArray = []
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
          name: columnObject[colId].colName,
          type: columnObject[colId].colType,
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
  let tables = parseJson(json)
  let tableText = tables.map(table => {
    let headerText = `CREATE TABLE ${table.name} \n`
    let columnsText = table.columns.map(column => {
      let boolConstraints = column.options.boolean.join(' ')
      if (column.options.variable.default) {
        boolConstraints += ` DEFAULT ${column.options.variable.default}`
      }
      return `    ${column.name} ${column.type} ${boolConstraints}`
    })
    return headerText + columnsText.join('\n')
  })
  return tableText.join('\n')
}
