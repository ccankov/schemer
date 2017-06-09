export const parseJson = (json) => {
  let cells = json.cells // array of table Objects
  let tableArray = []
  let columnObject = {}
  let indexArray = []
  let connectionArray = []
  let joinArray = []
  cells.forEach(cell => {
    if (cell.attrs.nodeType.value === 'column') {
      columnObject[cell.id] = cell
    } else if (cell.attrs.nodeType.value === 'link') {
      connectionArray.push(cell)
    }
  })
  connectionArray.forEach(connection => {
    let source = columnObject[connection.source.id].attrs
    let target = columnObject[connection.target.id].attrs
    if (source.options.primaryKey && target.options.primaryKey) {
      joinArray.push({
        source,
        target
      })
    } else if (source.options.primaryKey) {
      target.options.references = source
    } else if (target.options.primaryKey) {
      source.options.references = target
    }
  })
  cells.forEach(cell => {
    if (cell.attrs.nodeType.value === 'table') {
      let tableCols = cell.attrs.columns.value.map(colId => {
        let booleans = []
        columnObject[colId].attrs.options.notNull ? booleans.push('NOT NULL') : null
        columnObject[colId].attrs.options.unique ? booleans.push('UNIQUE') : null
        columnObject[colId].attrs.options.primaryKey ? booleans.push('PRIMARY KEY') : null
        columnObject[colId].attrs.tableName = cell.attrs.nodeName.value
        if (columnObject[colId].attrs.options.indexed) {
          let colName = columnObject[colId].attrs.nodeName.value
          indexArray.push({
            name: `${colName}_index`,
            table: `${cell.attrs.nodeName.value}`,
            colName
          })
        }
        return {
          // [colId]:
          name: columnObject[colId].attrs.nodeName.value,
          type: columnObject[colId].attrs.colType.value,
          references: columnObject[colId].attrs.options.references,
          options: {
            boolean: booleans,
            variable: {
              default: columnObject[colId].attrs.options.defaultVal,
              check: null // TODO: implement on front end
            }
          }
        }
      })
      tableArray.push({
        name: cell.attrs.nodeName.value,
        columns: tableCols
      })
    }
  })
  return {
    tables: tableArray,
    indices: indexArray,
    connections: connectionArray
  }
}

export const createSQL = (json) => {
  let dbCreate = `CREATE DATABASE ${json.dbName}\n`
  let dbInfo = parseJson(json)
  console.log(dbInfo)
  let tables = dbInfo.tables
  let indices = dbInfo.indices
  let tableText = tables.map(table => {
    let headerText = `CREATE TABLE ${table.name} \n`
    let columnsText = table.columns.map(column => {
      let boolConstraints = column.options.boolean.join(' ')
      if (column.options.variable.default) {
        boolConstraints += ` DEFAULT ${column.options.variable.default}`
      }
      let partialText = `    ${column.name} ${column.type} ${boolConstraints}`
      if (column.references) {
        return partialText + `REFERENCES ${column.references.tableName}`
      } else {
        return partialText
      }
    })
    return headerText + columnsText.join('\n') + '\n'
  })
  let indexText = indices.map(index => {
    return (`CREATE INDEX ${index.name}\nON ${index.table} (${index.colName})\n`)
  })
  return `${dbCreate}\n${tableText.join('\n')}\n${indexText.join('\n')}`
}
