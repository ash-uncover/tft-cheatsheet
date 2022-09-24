import {
  createSlice
} from '@reduxjs/toolkit'

import {
  DataStates
} from 'lib/constants'

export const initialState = () => ({
  itemsHover: {}
})

// START //

export const appItemsHover = (state, { payload }) => {
  if (!state.itemsHover.locked) {
    state.itemsHover = {
      itemId: payload.itemId,
      indexRow: payload.indexRow,
      indexCol: payload.indexCol,
    }
  }
}
export const appItemsSelect = (state, { payload }) => {
  if (payload.itemId) {
    state.itemsHover = {
      locked: true,
      itemId: payload.itemId,
      indexRow: payload.indexRow,
      indexCol: payload.indexCol
    }
  } else {
    state.itemsHover.locked = false
  }
}

// MAIN REDUCER //

const appSlice = createSlice({
  name: 'app',
  initialState: initialState(),

  reducers: {
    appItemsHover,
    appItemsSelect,
  },
})

appSlice.selectors = {
  appSelector: (state) => state.app,

  appItemsHoverSelector: (state) => appSlice.selectors.appSelector(state).itemsHover,
}

export const {
  actions,
  reducer,
  selectors
} = appSlice

export default appSlice
