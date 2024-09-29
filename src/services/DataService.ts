import {
  Config,
  Service
} from '@uncover/js-utils-fetch'

const DataConfig = new Config({
  server: 'http://localhost:8080',
  useDebug: false,
})

const getBuilds = async () => {
  const url = '/builds.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getChampions = async () => {
  const url = '/champions.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getClasses = async () => {
  const url = '/classes.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getCompos = async () => {
  const url = '/compos.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getItems = async () => {
  const url = '/items.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getOrigins = async () => {
  const url = '/origins.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const DataService = new Service(DataConfig, '/data', {
  v1: {
    data: {
      builds: {
        get: getBuilds
      },
      champions: {
        get: getChampions
      },
      classes: {
        get: getClasses
      },
      compos: {
        get: getCompos
      },
      items: {
        get: getItems
      },
      origins: {
        get: getOrigins
      },
    }
  }
})

export default DataService
