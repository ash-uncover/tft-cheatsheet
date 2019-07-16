const UrlUtils = {

  getParams (s) {
    if (s === null || typeof s === 'undefined') {
      throw new Error('Argument cannot be null or undefined')
    }
    if (typeof s !== 'string') {
      throw new Error('Argument must be a string')
    }
    if (s.indexOf('?') !== 0) {
      return {}
    }

    const params = s.substring(1).split('&')

    return params.reduce((input, param) => {
      const output = Object.assign({}, input)
      const pair = param.split('=')
      output[pair[0]] = pair.length > 1 ? pair[1] : undefined
      return output
    }, {})
  },

  buildParams (params) {
      if (params === null || typeof params === 'undefined') {
        throw new Error('Argument cannot be null or undefined')
      }
      if (typeof params !== 'object') {
        throw new Error('Argument must be an object')
      }
      return Object.keys(params).reduce((input, param) => {
        let output
        if (input !== '?') {
          output = `${input}&`
        } else {
          output = input
        }
        output += `${param}=${params[param]}`
        return output
      }, '?')
  }
}

export default UrlUtils
