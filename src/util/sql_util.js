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
  joinArray.forEach(join => {
    let source = join.source
    let target = join.target
    let sourceName = `${source.tableName}_id`
    let targetName = `${target.tableName}_id`
    let tableName = `${source.tableName}_${target.tableName}_join`
    if (target === source) {
      sourceName = `${source.tableName}_id`
      targetName = `${target.tableName}_id2`
      tableName = `${source.tableName}_self_join`
    }
    let options = {
      boolean: ['NOT NULL'],
      variable: {
        default: null,
        check: null // TODO: implement on front end
      }
    }
    let newTable = {
      name: tableName,
      columns: [
        {
          name: sourceName,
          type: `${source.colType.value}`,
          references: source,
          options
        },
        {
          name: targetName,
          type: `${target.colType.value}`,
          references: target,
          options
        }
      ]
    }
    tableArray.push(newTable)
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
        return partialText + ` REFERENCES ${column.references.tableName}`
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
