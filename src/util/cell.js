class Cell {
  constructor (element) {
    this.element = element
  }

  getName () {
    return this.element.attributes.attrs.nodeName.value
  }

  setName (name) {
    this.element.attr('text', { text: name })
    this.element.attr('nodeName', { value: name })
    return name
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
}

export default Cell
