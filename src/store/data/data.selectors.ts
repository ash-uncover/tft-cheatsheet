import type { RootState } from '../state'
import { DataState } from './data.state'

const root = (state: RootState): DataState => state.data

const status = (state: RootState) => root(state).status
const error = (state: RootState) => root(state).error

const builds = (state: RootState) => root(state).builds
const champions = (state: RootState) => root(state).champions
const classes = (state: RootState) => root(state).classes
const compos = (state: RootState) => root(state).compos
const items = (state: RootState) => root(state).items
const origins = (state: RootState) => root(state).origins

const champion = (id: string) => (state: RootState) => champions(state)[id]
const compo = (id: string) => (state: RootState) => compos(state).find(compo => compo.id === id)
const classe = (id: string) => (state: RootState) => classes(state).find(classe => classe.id === id)
const item = (id: string) => (state: RootState) => items(state).find(item => item.id === id)
const origin = (id: string) => (state: RootState) => origins(state).find(origin => origin.id === id)

export const DataSelectors = {
  root,

  status,
  error,
  
  builds,
  champions,
  classes,
  compos,
  items,
  origins,
  
  champion,
  compo,
  classe,
  item,
  origin,
}
