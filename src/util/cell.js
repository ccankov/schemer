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
    if (name.length > 10) textVal = name.substring(0, 10) + '...'
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

    for (let key in currentOptions) {
      if (!options[key]) {
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

  getColType () {
    if (!this.isCol()) return null
    return this.element.attributes.attrs.colType.value
  }

  setColType (type) {
    if (!this.isCol()) return null
    this.element.attr('colType', { value: type })
  }
}

export default Cell
