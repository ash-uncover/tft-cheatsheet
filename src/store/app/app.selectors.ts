import type { RootState } from '../state'
import { AppState } from './app.state'

const root = (state: RootState): AppState => state.app

const championHover = (state: RootState) => root(state).championHover
const classeHover = (state: RootState) => root(state).classeHover
const itemHover = (state: RootState) => root(state).itemHover
const originHover = (state: RootState) => root(state).originHover

export const AppSelectors = {
  root,

  championHover,
  classeHover,
  itemHover,
  originHover,  
}
