import request from 'request'
import ServiceRegistry from 'core/ServiceRegistry'

export class Service {

  constructor () {
    this._SERVER_PROTOCOL = 'http'
    this._SERVER_HOST = 'localhost'
    this._SERVER_PORT = '8080'
    this._SERVER_TOKEN = null

    this._buildUrlBase()

    this.service = {
      items: {
        get: () => this._request({ url: '/assets/data/items/items.json' })
      },
      champions: {
        get: () => this._request({ url: '/assets/data/champions/champions.json' })
      },
      origins: {
        get: () => this._request({ url: '/assets/data/origins/origins.json' })
      },
      classes: {
        get: () => this._request({ url: '/assets/data/classes/classes.json' })
      },
      bonuses: {
        get: () => this._request({ url: '/assets/data/items/bonus.json' })
      }
    }
  }

  get SERVER_PROTOCOL () {
    return this._SERVER_PROTOCOL
  }
  set SERVER_PROTOCOL (value) {
    this._SERVER_PROTOCOL = value
    this._buildUrlBase()
  }

  get SERVER_HOST () {
    return this._SERVER_HOST
  }
  set SERVER_HOST (value) {
    this._SERVER_HOST = value
    this._buildUrlBase()
  }

  get SERVER_PORT () {
    return this._SERVER_PORT
  }
  set SERVER_PORT (value) {
    this._SERVER_PORT = value
    this._buildUrlBase()
  }

  get URL_BASE () {
    return this._URL_BASE
  }

  _buildUrlBase () {
    this._URL_BASE = `${this.SERVER_PROTOCOL}://${this.SERVER_HOST}:${this.SERVER_PORT}`
  }

  _request (reqParam) {
    return new Promise((resolve, reject) => {

      const params = Object.assign(
        { method: 'GET' },
        reqParam,
        { url: `${this.URL_BASE}${reqParam.url}` }
      )

      request(params, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 300) {
          try {
            resolve(JSON.parse(body))
          } catch (err) {
            resolve(body)
          }
        } else {
          if (error) {
            reject(error)
          } else {
            try {
              reject(JSON.parse(body))
            } catch (err) {
              reject(body)
            }
          }
        }
      })
    })
  }

}

const ServiceData = new Service()

ServiceRegistry.register(ServiceData, 'DATA')

export default ServiceData
