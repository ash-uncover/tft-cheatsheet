import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppState 
} from './app.state'

// #region State
export const getInitialState = () => ({
  classeHover: {},
  championHover: {},
  itemHover: {},
  originHover: {},
})
// #endregion

// #region Reducers

/**
 * Reducers definition
 */

// #region > Hover Champ
interface IChampionHoverPayload {
  id?: string
  origins?: any
  classes?: any
}
export const hoverChampion: CaseReducer<
  AppState,
  PayloadAction<IChampionHoverPayload>
> = (state, action) => {
  if (!state.championHover.locked) {
    state.championHover = {
      id: action.payload.id,
      origins: action.payload.origins,
      classes: action.payload.classes,
    }
  }
}
// #endregion

// #region > Select Champ
interface IChampionSelectPayload {
  id: string
  championId: string
  origins: any
  classes: any
}
export const selectChampion: CaseReducer<
AppState,
PayloadAction<IChampionSelectPayload>
> = (state, action) => {
  if (action.payload.championId) {
    state.championHover = {
      locked: true,
      id: action.payload.id,
      origins: action.payload.origins,
      classes: action.payload.classes,
    }
  } else {
    state.itemHover.locked = false
  }
}
// #endregion

// #region > Hover Class
interface IHoverClassPayload {
  id?: string
}
export const hoverClass: CaseReducer<
  AppState,
  PayloadAction<IHoverClassPayload>
> = (state, action) => {
  if (!state.classeHover.locked) {
    state.classeHover = {
      id: action.payload.id
    }
  }
}
// #endregion

// #region > Select Class 
interface ISelectClassPayload {
  id: string
  classeId: string
}
export const selectClass: CaseReducer<
  AppState,
  PayloadAction<ISelectClassPayload>
> = (state, action) => {
  if (action.payload.classeId) {
    state.classeHover = {
      locked: true,
      id: action.payload.id
    }
  } else {
    state.itemHover.locked = false
  }
}
// #endregion

// #region > Hover Item
interface IHoverItemPayload {
  id: string
  indexRow: number
  indexCol: number
}
export const hoverItem: CaseReducer<
  AppState,
  PayloadAction<IHoverItemPayload>
> = (state, action) => {
  if (!state.itemHover.locked) {
    state.itemHover = {
      id: action.payload.id,
      indexRow: action.payload.indexRow,
      indexCol: action.payload.indexCol,
    }
  }
}
// #endregion

// #region > Select Item
interface ISelectItemPayload {
  id: string
  itemId: string
  indexRow: number
  indexCol: number
}
export const selectItem: CaseReducer<
  AppState,
  PayloadAction<ISelectItemPayload>
> = (state, action) => {
  if (action.payload.itemId) {
    state.itemHover = {
      locked: true,
      id: action.payload.id,
      indexRow: action.payload.indexRow,
      indexCol: action.payload.indexCol
    }
  } else {
    state.itemHover.locked = false
  }
}
// #endregion

// #region > Hover Origin
interface IHoverOriginPayload {
  id?: string
}
export const hoverOrigin: CaseReducer<
  AppState,
  PayloadAction<IHoverOriginPayload>
> = (state, action) => {
  if (!state.originHover.locked) {
    state.originHover = {
      id: action.payload.id,
    }
  }
}
// #endregion

// #region > Select Origin 
interface ISelectOriginPayload {
  id: string
  originId: string
}
export const selectOrigin: CaseReducer<
  AppState,
  PayloadAction<ISelectOriginPayload>
> = (state, action) => {
  if (action.payload.originId) {
    state.originHover = {
      locked: true,
      id: action.payload.id,
    }
  } else {
    state.itemHover.locked = false
  }
}
// #endregion

// #endregion

// #region Slice
export const AppSlice = createSlice({
  name: 'app',
  initialState: getInitialState(),

  reducers: {
    hoverChampion,
    selectChampion,
    hoverClass,
    selectClass,
    hoverItem,
    selectItem,
    hoverOrigin,
    selectOrigin,
  },
})
// #endregion