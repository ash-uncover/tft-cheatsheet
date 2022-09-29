import {
  createSlice
} from '@reduxjs/toolkit'

import {
  DataStates
} from 'lib/constants'

export const initialState = () => ({
  status: DataStates.NEVER,
  error: null,
  builds: [],
  champions: [],
  classes: [],
  compos: [],
  items: [],
  origins: [],
})

// START //

export const dataLoadRequest = (state, { payload }) => {
  state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const dataLoadSuccess = (state, { payload }) => {
  state.status = DataStates.SUCCESS
  state.error = null
  state.builds = payload.builds
  state.champions = payload.champions
  state.classes = payload.classes
  state.compos = payload.compos
  state.items = payload.items
  state.origins = payload.origins
}
export const dataLoadFailure = (state, { payload }) => {
  state.status = DataStates.FAILURE
  state.error = payload.error
}

// MAIN REDUCER //

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState(),

  reducers: {
    dataLoadRequest,
    dataLoadSuccess,
    dataLoadFailure,
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
