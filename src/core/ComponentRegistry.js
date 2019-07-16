const ComponentRegistry = {
  register: function (component, name) {
    const componentName = name || component.name
    if (!componentName) {
      throw new Error('Component name cannot be null or empty')
    }
    if (this[componentName]) {
      throw new Error(`Component already defined: ${componentName}`)
    }
    this[componentName] = component
  }
}

export default ComponentRegistry
