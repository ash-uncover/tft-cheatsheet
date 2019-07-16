const ServiceRegistry = {
  register: function (service, name) {
    const serviceName = name || service.name
    if (!serviceName) {
      throw new Error('Service name cannot be null or empty')
    }
    if (serviceName === 'register') {
      throw new Error('Service name cannot be equals to "register"')
    }
    if (this[serviceName]) {
      throw new Error(`Service already defined: "${serviceName}"`)
    }
    this[serviceName] = service
  }
}

export default ServiceRegistry
