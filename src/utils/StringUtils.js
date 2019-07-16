export const StringUtils = {

  capitalize (s) {
    if (s === null || typeof s === 'undefined') {
      throw new Error('Argument cannot be null or undefined')
    }
    if (typeof s !== 'string') {
      throw new Error('Argument must be a string')
    }
    if (s.length) {
      return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase()
    }
    return ''
  }

}

export class StringLabel {

  constructor (s, sep) {
    if (s === null || typeof s === 'undefined') {
      throw new Error('Argument cannot be null or undefined')
    }
    if (typeof s !== 'string') {
      throw new Error('Argument must be a string')
    }
    const separator = sep || ' '
    if (typeof separator !== 'string') {
      throw new Error('Separator must be a string')
    }
    this._s = s
    this._words = s.split(separator).map(w => w.toLowerCase()).filter(w => !!w)
  }

  get words () {
    return this._words
  }

  get camel () {
    return this.words.map((w, index) => (index === 0 ? w : StringUtils.capitalize(w))).join('')
  }

  get pascal () {
    return this.words.map(w => StringUtils.capitalize(w)).join('')
  }

  get worm () {
    return this.words.map(w => w.toLowerCase()).join('_')
  }

  get snake () {
    return this.words.map(w => StringUtils.capitalize(w)).join('_')
  }

  get serpent () {
    return this.words.map(w => w.toUpperCase()).join('_')
  }
}
