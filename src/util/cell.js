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

  columns () {
    if (this.isTable()) {
      return this.element.attributes.attrs.columns.value
    } else {
      return []
    }
  }

  // column only

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

  setColOptions (optionsArr) {
    let options = {
      primaryKey: false,
      notNull: false,
      indexed: false,
      unique: false,
      default: null
    }

    optionsArr.forEach(option => { options[option] = true })

    this.setAttr('options', options)
  }
}

export default Cell
