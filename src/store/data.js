import {
  createSlice
} from '@reduxjs/toolkit'

import {
  DataStates
} from 'lib/constants'

const LOCAL_STORAGE_COMPOS = 'TFT-COMPOS'
const LOCAL_STORAGE_BUILDS = 'TFT-BUILDS'

const useStorage = true

const loadStorage = (key, defaultValue) => {
  if (useStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  }
  return defaultValue
}

export const initialState = () => ({
  status: DataStates.NEVER,
  error: null,
  builds: loadStorage(LOCAL_STORAGE_BUILDS, []),
  champions: [],
  classes: [],
  compos: loadStorage(LOCAL_STORAGE_COMPOS, []),
  items: [],
  origins: [],
})

// START //

export const loadRequest = (state, { payload }) => {
  state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const loadSuccess = (state, { payload }) => {
  state.status = DataStates.SUCCESS
  state.error = null
  state.builds = payload.builds
  state.champions = payload.champions
  state.classes = payload.classes
  state.compos = (!payload.refresh && state.compos.length) ? state.compos : payload.compos
  state.items = payload.items
  state.origins = payload.origins

  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
  localStorage.setItem(LOCAL_STORAGE_BUILDS, JSON.stringify(state.builds))
}
export const loadFailure = (state, { payload }) => {
  state.status = DataStates.FAILURE
  state.error = payload.error
}

export const createCompo = (state, { payload }) => {
  state.compos = [...state.compos, payload.compo]
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}
export const deleteCompo = (state, { payload }) => {
  state.compos = state.compos.filter(compo => compo.id !== payload.id)
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}
export const updateCompo = (state, { payload }) => {
  const index = state.compos.indexOf(compo => compo.id !== payload.id)
  state.compos[index] = payload.compo
  localStorage.setItem(LOCAL_STORAGE_COMPO, JSON.stringify(state.compos))
}
export const importCompos = (state, { payload }) => {
  state.compos = payload.compos
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}

// MAIN REDUCER //

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState(),

  reducers: {
    loadRequest,
    loadSuccess,
    loadFailure,

    createCompo,
    updateCompo,
    deleteCompo,
    importCompos,
  },
})

dataSlice.selectors = {
  root: (state) => state.data,

  status: (state) => dataSlice.selectors.root(state).status,
  error: (state) => dataSlice.selectors.root(state).error,

  builds: (state) => dataSlice.selectors.root(state).builds,
  champions: (state) => dataSlice.selectors.root(state).champions,
  classes: (state) => dataSlice.selectors.root(state).classes,
  compos: (state) => dataSlice.selectors.root(state).compos,
  items: (state) => dataSlice.selectors.root(state).items,
  origins: (state) => dataSlice.selectors.root(state).origins,

  champion: (id) => (state) => dataSlice.selectors.champions(state).find(champion => champion.id === id),
  compo: (id) => (state) => dataSlice.selectors.compos(state).find(compo => compo.id === id),
  classe: (id) => (state) => dataSlice.selectors.classes(state).find(classe => classe.id === id),
  item: (id) => (state) => dataSlice.selectors.items(state).find(item => item.id === id),
  origin: (id) => (state) => dataSlice.selectors.origins(state).find(origin => origin.id === id),
}

export const {
  actions,
  reducer,
  selectors
} = dataSlice

export default dataSlice
