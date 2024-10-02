import {
  Config,
  Service
} from '@uncover/js-utils-fetch'
import { 
  DataCustomChampion,
  LolDataChampion 
} from '../lib/model/DataChampion'

const getBuilds = async () => {
  const url = '/data/builds.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getChampions = async (): Promise<Record<string, DataCustomChampion>> => {
  const url = '/data/champions.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json() as DataCustomChampion[]
  const result = {}
  responseData.forEach(champion => {
    result[champion.id] = champion
  })
  return result
}

const getLolChampions = async (): Promise<Record<string, LolDataChampion>> => {
  const url = '/lol-data/14.19.1/data/en_US/tft-champion.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  const result = {}
  Object.values(responseData.data).forEach((champion: LolDataChampion) => {
    if (champion.id.startsWith('TFT12_')) {
      result[champion.id] = champion
    }
  })
  return result
}

const getClasses = async () => {
  const url = '/data/classes.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getCompos = async () => {
  const url = '/data/compos.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getItems = async () => {
  const url = '/data/items.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const getOrigins = async () => {
  const url = '/data/origins.json'
  const options = {
    method: 'GET',
  }
  const response = await DataService.fetch(url, options)
  const responseData = await response.json()
  return responseData
}

const DataConfig = new Config({
  server: 'http://localhost:8080',
  useDebug: false,
})

export const DataService = new Service(DataConfig, '/', {
  v1: {
    data: {
      lol: {
        champions: {
          get: getLolChampions
        },
      },
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