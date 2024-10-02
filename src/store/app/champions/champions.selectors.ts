import type { RootState } from '../../state'
import { ChampionsState } from './champions.state'

const root = (state: RootState): ChampionsState => state.app.champions

const championHover = (state: RootState) => root(state).championHover
const championSelected = (state: RootState) => root(state).championSelected
const classeHover = (state: RootState) => root(state).classeHover
const classeSelected = (state: RootState) => root(state).classeSelected
const originHover = (state: RootState) => root(state).originHover
const originSelected = (state: RootState) => root(state).originSelected

export const ChampionsSelectors = {
  root,

  championHover,
  championSelected,
  classeHover,
  classeSelected,
  originHover,
  originSelected,
}
