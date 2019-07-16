import { StringLabel } from 'utils/StringUtils'

const ActionRegistry = {
  register: function (actionName, args) {
    if (!actionName) {
      throw new Error('Action must be given a name in upper snake case')
    }
    const name = new StringLabel(actionName, '_')
    if (this[name.serpent]) {
      throw new Error(`ActionRegistry.register - Action already defined: ${name.serpent}`)
    }
    this[name.serpent] = name.serpent
    this[name.camel] = function () {
      const myArgs = {}
      args && args.forEach((arg, index) => {
        myArgs[arg] = arguments.length > index ? arguments[index] : null
      })
      return {
        args: myArgs,
        type: name.serpent
      }
    }
  }
}

export default ActionRegistry
