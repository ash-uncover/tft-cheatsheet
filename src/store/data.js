import {
  createSlice
} from '@reduxjs/toolkit'

import {
  DataStates
} from 'lib/constants'

export const initialState = () => ({
  status: DataStates.NEVER,
  error: null,
  items: [],
  champions: [],
  origins: [],
  classes: [],
})

// START //

export const dataLoadRequest = (state, { payload }) => {
  state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const dataLoadSuccess = (state, { payload }) => {
  state.status = DataStates.SUCCESS
  state.error = null
  state.items = payload.items
  state.champions = payload.champions
  state.origins = payload.origins
  state.classes = payload.classes
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

  dataChampionsSelector: (state) => dataSlice.selectors.dataSelector(state).champions,
  dataClassesSelector: (state) => dataSlice.selectors.dataSelector(state).classes,
  dataItemsSelector: (state) => dataSlice.selectors.dataSelector(state).items,
  dataOriginsSelector: (state) => dataSlice.selectors.dataSelector(state).origins,
}

export const {
  actions,
  reducer,
  selectors
} = dataSlice

export default dataSlice
