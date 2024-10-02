import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  ChampionActiveState,
  ChampionsState,
  TraitActiveState
} from './champions.state'

// #region State
export const getInitialState = (): ChampionsState => ({
  championHover: null,
  championSelected: null,
  classeHover: null,
  classeSelected: null,
  originHover: null,
  originSelected: null,
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
  ChampionsState,
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
  ChampionsState,
  PayloadAction<void>
> = (state) => {
  state.championHover = null
}
// #endregion

// #region >> Select
export const selectChampion: CaseReducer<
  ChampionsState,
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
  ChampionsState,
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
  ChampionsState,
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
  ChampionsState,
  PayloadAction<void>
> = (state) => {
  state.classeHover = null
}
// #endregion

// #region >> Select 
export const selectClass: CaseReducer<
  ChampionsState,
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
  ChampionsState,
  PayloadAction<void>
> = (state) => {
  state.classeHover = state.classeSelected
  state.classeSelected = null
}
// #endregion

// #endregion

// #region > Hover Origin
export const hoverOrigin: CaseReducer<
  ChampionsState,
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
  ChampionsState,
  PayloadAction<void>
> = (state) => {
  state.originHover = null
}
// #endregion

// #region >> Select 
export const selectOrigin: CaseReducer<
  ChampionsState,
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
  ChampionsState,
  PayloadAction<void>
> = (state) => {
  state.originHover = state.originSelected
  state.originSelected = null
}
// #endregion

// #endregion

// #endregion

// #region Slice
export const ChampionsSlice = createSlice({
  name: 'champions',
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
  },
})
// #endregion