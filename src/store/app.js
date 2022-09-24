import {
  createSlice
} from '@reduxjs/toolkit'

export const initialState = () => ({
  classeHover: {},
  championHover: {},
  itemHover: {},
  originHover: {},
})

// START //

export const appChampionHover = (state, { payload }) => {
  if (!state.championHover.locked) {
    state.championHover = {
      id: payload.id,
      origins: payload.origins,
      classes: payload.classes,
    }
  }
}
export const appChampionSelect = (state, { payload }) => {
  if (payload.championId) {
    state.championHover = {
      locked: true,
      id: payload.id,
      origins: payload.origins,
      classes: payload.classes,
    }
  } else {
    state.itemHover.locked = false
  }
}

export const appClasseHover = (state, { payload }) => {
  if (!state.classeHover.locked) {
    state.classeHover = {
      id: payload.id
    }
  }
}
export const appClasseSelect = (state, { payload }) => {
  if (payload.classeId) {
    state.classeHover = {
      locked: true,
      id: payload.id
    }
  } else {
    state.itemHover.locked = false
  }
}

export const appItemHover = (state, { payload }) => {
  if (!state.itemHover.locked) {
    state.itemHover = {
      id: payload.id,
      indexRow: payload.indexRow,
      indexCol: payload.indexCol,
    }
  }
}
export const appItemSelect = (state, { payload }) => {
  if (payload.itemId) {
    state.itemHover = {
      locked: true,
      id: payload.id,
      indexRow: payload.indexRow,
      indexCol: payload.indexCol
    }
  } else {
    state.itemHover.locked = false
  }
}

export const appOriginHover = (state, { payload }) => {
  if (!state.originHover.locked) {
    state.originHover = {
      id: payload.id,
    }
  }
}
export const appOriginSelect = (state, { payload }) => {
  if (payload.originId) {
    state.originHover = {
      locked: true,
      id: payload.id,
    }
  } else {
    state.itemHover.locked = false
  }
}

// MAIN REDUCER //

const appSlice = createSlice({
  name: 'app',
  initialState: initialState(),

  reducers: {
    appChampionHover,
    appChampionSelect,
    appClasseHover,
    appClasseSelect,
    appItemHover,
    appItemSelect,
    appOriginHover,
    appOriginSelect,
  },
})

appSlice.selectors = {
  appSelector: (state) => state.app,

  appChampionHoverSelector: (state) => appSlice.selectors.appSelector(state).championHover,
  appClasseHoverSelector: (state) => appSlice.selectors.appSelector(state).classeHover,
  appItemHoverSelector: (state) => appSlice.selectors.appSelector(state).itemHover,
  appOriginHoverSelector: (state) => appSlice.selectors.appSelector(state).originHover,
}

export const {
  actions,
  reducer,
  selectors
} = appSlice

export default appSlice
