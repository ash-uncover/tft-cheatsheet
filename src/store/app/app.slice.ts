import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  AppState, 
  ChampionActiveState,
  TraitActiveState
} from './app.state'

// #region State
export const getInitialState = (): AppState => ({
  championHover: null,
  championSelected: null,
  classeHover: null,
  classeSelected: null,
  originHover: null,
  originSelected: null,
  
  itemHover: null,
  itemSelected: null,
})
// #endregion

// #region Reducers

/**
 * Reducers definition
 */

// #region > Champion

/**
 * Champion Stuff
 */

// #region >> Hover
export const hoverChampion: CaseReducer<
  AppState,
  PayloadAction<ChampionActiveState>
> = (state, action) => {
  if (!state.championSelected?.id && !state.classeSelected?.id && !state.originSelected?.id) {
    state.classeHover = null
    state.originHover = null
    state.championHover = action.payload
  }
}
// #endregion

// #region >> Unhover
export const unhoverChampion: CaseReducer<
  AppState,
  PayloadAction<void>
> = (state) => {
  state.championHover = null
}
// #endregion

// #region >> Select
export const selectChampion: CaseReducer<
  AppState,
  PayloadAction<ChampionActiveState>
> = (state, action) => {
  state.championHover = null
  state.championSelected = action.payload
  state.classeHover = null
  state.classeSelected = null
  state.originHover = null
  state.originSelected = null
}
// #endregion

// #region >> Unselect
export const unselectChampion: CaseReducer<
  AppState,
  PayloadAction<void>
> = (state) => {
  state.championHover = state.championSelected
  state.championSelected = null
}
// #endregion

// #endregion

// #region > Class

/**
 * Class Stuff
 */

// #region >> Hover
export const hoverClass: CaseReducer<
  AppState,
  PayloadAction<TraitActiveState>
> = (state, action) => {
  if (!state.championSelected?.id && !state.classeSelected?.id && !state.originSelected?.id) {
    state.classeHover = action.payload
    state.originHover = null
    state.championHover = null
  }
}
// #endregion

// #region >> Unhover
export const unhoverClass: CaseReducer<
  AppState,
  PayloadAction<void>
> = (state) => {
  state.classeHover = null
}
// #endregion

// #region >> Select 
export const selectClass: CaseReducer<
  AppState,
  PayloadAction<TraitActiveState>
> = (state, action) => {
  state.classeHover = null
  state.classeSelected = action.payload
  state.championHover = null
  state.championSelected = null
  state.originHover = null
  state.originSelected = null
}
// #endregion

// #region >> Unselect
export const unselectClass: CaseReducer<
  AppState,
  PayloadAction<void>
> = (state) => {
  state.classeHover = state.classeSelected
  state.classeSelected = null
}
// #endregion

// #endregion

// #region > Hover Origin
export const hoverOrigin: CaseReducer<
  AppState,
  PayloadAction<TraitActiveState>
> = (state, action) => {
  if (!state.championSelected?.id && !state.classeSelected?.id && !state.originSelected?.id) {
    state.championHover = null
    state.classeHover = null
    state.originHover = action.payload
  }
}
// #endregion

// #region > Origin

/**
 * Origin Stuff
 */

// #region >> Unhover
export const unhoverOrigin: CaseReducer<
  AppState,
  PayloadAction<void>
> = (state) => {
  state.originHover = null
}
// #endregion

// #region >> Select 
export const selectOrigin: CaseReducer<
  AppState,
  PayloadAction<TraitActiveState>
> = (state, action) => {
  state.championHover = null
  state.championSelected = null
  state.classeHover = null
  state.classeSelected = null
  state.originHover = null
  state.originSelected = action.payload
}
// #endregion

// #region >> Unselect
export const unselectOrigin: CaseReducer<
  AppState,
  PayloadAction<void>
> = (state) => {
  state.originHover = state.originSelected
  state.originSelected = null
}
// #endregion

// #endregion

// #region > Item

/**
 * Item Stuff
 */

// #region >> Hover
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

// #region >> Select
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

// #endregion

// #endregion

// #region Slice
export const AppSlice = createSlice({
  name: 'app',
  initialState: getInitialState(),

  reducers: {
    hoverChampion,
    unhoverChampion,
    selectChampion,
    unselectChampion,
    
    hoverClass,
    unhoverClass,
    selectClass,
    unselectClass,
    
    hoverOrigin,
    unhoverOrigin,
    selectOrigin,
    unselectOrigin,
    
    hoverItem,
    selectItem,
  },
})
// #endregion