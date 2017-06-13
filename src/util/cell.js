import {
  addColumn,
  removeColumn,
  addHeaderColumn,
  resizeTable,
  buildAttributes
} from './jointjs_util'

class Cell {
  constructor (element) {
    this.element = element
  }

  getId () {
    return this.element.id
  }

  getName () {
    return this.element.attributes.attrs.nodeName.value
  }

  setName (name) {
    let textVal = name
    if (name.length > 15) textVal = name.substring(0, 15) + '...'
    this.element.attr('nodeName', { value: name })
    if (this.isCol()) {

    } else {
      this.element.attr('text', { text: textVal })
    }

    return name
  }

  setAttr (attrName, options) {
    let currentOptions = this.element.attributes.attrs[attrName]
    // currentOptions is lazily evaluated, cant use Object.assign

    for (let key in options) {
      if (options[key] === undefined) {
        options[key] = currentOptions[key]
      }
    }

    this.element.attr(attrName, options)
  }

  parentId () {
    return this.element.attributes.parent
  }

  embeds () {
    return this.element.attributes.embeds
  }

  type () {
    return this.element.attributes.attrs.nodeType.value
  }

  isTable () {
    return this.type() === 'table'
  }

  isCol () {
    return this.type() === 'column'
  }

  // tables only

  columns () {
    if (this.isTable()) {
      return this.element.attributes.attrs.columns.value
    } else {
      return []
    }
  }

  bindTableMethods () {
    this.element.attributes.addColumn = addColumn.bind(this.element)
    this.element.attributes.removeColumn = removeColumn.bind(this.element)
    this.element.attributes.addHeaderColumn = addHeaderColumn.bind(this.element)
    this.element.attributes.resizeTable = resizeTable.bind(this.element)
  }

  // column only
  bindColumnMethods () {
    this.element.attributes.buildAttributes = buildAttributes.bind(this.element)
  }

  getColType () {
    if (!this.isCol()) return null
    return this.element.attributes.attrs.colType.value
  }

  setColType (type) {
    if (!this.isCol()) return null
    this.element.attr('colType', { value: type })
  }

  getColOptions () {
    return Object.assign({}, this.element.attributes.attrs.options)
  }

  setColOptions (options) {
    options = Object.assign({}, this.getColOptions(), options)
    this.setAttr('options', options)
    return options
  }
}

export default Cell
