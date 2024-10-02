import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { 
  ItemsState, 
} from './items.state'

// #region State
export const getInitialState = (): ItemsState => ({
  itemHover: null,
  itemSelected: null,
})
// #endregion

// #region Reducers

/**
 * Reducers definition
 */
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
  ItemsState,
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
  ItemsState,
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
export const ItemsSlice = createSlice({
  name: 'items',
  initialState: getInitialState(),

  reducers: {
    hoverItem,
    selectItem,
  },
})
// #endregion