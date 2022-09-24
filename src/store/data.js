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
  dataSelector: (state) => state.data,

  dataStatusSelector: (state) => dataSlice.selectors.dataSelector(state).status,
  dataErrorSelector: (state) => dataSlice.selectors.dataSelector(state).error,

  dataBuildsSelector: (state) => dataSlice.selectors.dataSelector(state).builds,
  dataChampionsSelector: (state) => dataSlice.selectors.dataSelector(state).champions,
  dataClassesSelector: (state) => dataSlice.selectors.dataSelector(state).classes,
  dataComposSelector: (state) => dataSlice.selectors.dataSelector(state).compos,
  dataItemsSelector: (state) => dataSlice.selectors.dataSelector(state).items,
  dataOriginsSelector: (state) => dataSlice.selectors.dataSelector(state).origins,

  dataChampionSelector: (id) => (state) => dataSlice.selectors.dataSelector(state).champions.find(champion => champion.id === id),
  dataItemSelector: (id) => (state) => dataSlice.selectors.dataSelector(state).items.find(item => item.id === id),
}

export const {
  actions,
  reducer,
  selectors
} = dataSlice

export default dataSlice
