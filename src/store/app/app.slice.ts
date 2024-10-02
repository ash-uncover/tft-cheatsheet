import { combineSlices } from '@reduxjs/toolkit'

import { ChampionsSlice } from './champions/champions.slice'
import { ItemsSlice } from './items/items.slice'

// #region Slice
export const AppSlice = combineSlices(
  ChampionsSlice, 
  ItemsSlice,
)
// #endregion