class Cell {
  constructor (element) {
    this.element = element
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
}

export default Cell
