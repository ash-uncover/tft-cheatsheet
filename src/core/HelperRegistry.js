const HelperRegistry = {
  register: function (helper, name) {
    const helperName = name || helper.name
    if (!helperName) {
      throw new Error('Helper name cannot be null or empty')
    }
    if (helperName === 'register') {
      throw new Error('Helper name cannot be equals to "register"')
    }
    if (this[helperName]) {
      throw new Error(`Helper already defined: "${helperName}"`)
    }
    this[helperName] = helper
  }
}

export default HelperRegistry
