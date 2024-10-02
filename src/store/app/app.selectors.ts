import type { RootState } from '../state'
import { AppState } from './app.state'

const root = (state: RootState): AppState => state.app

const champions = (state: RootState) => root(state).champions
const items = (state: RootState) => root(state).items

export const AppSelectors = {
  root,

  champions,
  items,
}
