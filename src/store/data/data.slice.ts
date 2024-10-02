import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  DataStates
} from '../../lib/constants'

import { 
  DataState 
} from './data.state'
import { DataChampion } from 'src/lib/model/DataChampion'

const LOCAL_STORAGE_COMPOS = 'TFT-COMPOS'
const LOCAL_STORAGE_BUILDS = 'TFT-BUILDS'

const useStorage = true

const loadStorage = (key: string, defaultValue: any) => {
  if (useStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  }
  return defaultValue
}

// #region State
export const getInitialState = () => ({
  status: DataStates.NEVER,
  error: null,
  builds: loadStorage(LOCAL_STORAGE_BUILDS, []),
  champions: {},
  classes: [],
  compos: loadStorage(LOCAL_STORAGE_COMPOS, []),
  items: [],
  origins: []
})
// #endregion

// #region Reducers

/**
 * Reducers definition
 */

// #region > Load Request
interface ILoadRequestPayload {
}
export const loadRequest: CaseReducer<
  DataState,
  PayloadAction<void>
> = (state, action) => {
  state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
// #endregion

// #region > Load Success
interface ILoadSuccessPayload {
  builds: any
  champions: Record<string, DataChampion>
  classes: any
  refresh: any
  items: any
  compos: any
  origins: any
}
export const loadSuccess: CaseReducer<
  DataState,
  PayloadAction<ILoadSuccessPayload>
> = (state, action) => {
  state.status = DataStates.SUCCESS
  state.error = null
  state.builds = action.payload.builds
  state.champions = action.payload.champions
  state.classes = action.payload.classes
  state.compos = (!action.payload.refresh && state.compos.length) ? state.compos : action.payload.compos
  state.items = action.payload.items
  state.origins = action.payload.origins

  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
  localStorage.setItem(LOCAL_STORAGE_BUILDS, JSON.stringify(state.builds))
}
// #endregion

// #region > Load Failure
interface ILoadFailurePayload {
  error: any
}
export const loadFailure: CaseReducer<
  DataState,
  PayloadAction<ILoadFailurePayload>
> = (state, action) => {
  state.status = DataStates.FAILURE
  state.error = action.payload.error
}
// #endregion

// #region > Create Compo
interface ICreateCompoPayload {
  compo: any
}
export const createCompo: CaseReducer<
  DataState,
  PayloadAction<ICreateCompoPayload>
> = (state, action) => {
  state.compos = [...state.compos, action.payload.compo]
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}
// #endregion

// #region > Delete Compo
interface IDeleteCompoPayload {
  id: string
}
export const deleteCompo: CaseReducer<
  DataState,
  PayloadAction<IDeleteCompoPayload>
> = (state, action) => {
  state.compos = state.compos.filter(compo => compo.id !== action.payload.id)
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}
// #endregion

// #region > Update Compo
interface IUpdateCompoPayload {
  id: string
  compo: any
}
export const updateCompo: CaseReducer<
  DataState,
  PayloadAction<IUpdateCompoPayload>
> = (state, action) => {
  const index = state.compos.indexOf(compo => compo.id !== action.payload.id)
  state.compos[index] = action.payload.compo
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}
// #endregion

// #region > Import Compos
interface IImportComposPayload {
  compos: any
}
export const importCompos: CaseReducer<
  DataState,
  PayloadAction<IImportComposPayload>
> = (state, action) => {
  state.compos = action.payload.compos
  localStorage.setItem(LOCAL_STORAGE_COMPOS, JSON.stringify(state.compos))
}
// #endregion

// #endregion

// #region Slice
export const DataSlice = createSlice({
  name: 'data',
  initialState: getInitialState(),

  reducers: {
    loadRequest,
    loadSuccess,
    loadFailure,

    createCompo,
    updateCompo,
    deleteCompo,
    importCompos,
  },
})
// #endregion
