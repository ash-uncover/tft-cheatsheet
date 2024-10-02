import type { RootState } from '../../state'
import { ItemsState } from './items.state'

const root = (state: RootState): ItemsState => state.app.items

const itemHover = (state: RootState) => root(state).itemHover
const itemSelected = (state: RootState) => root(state).itemSelected

export const ItemsSelectors = {
  root,

  itemHover,
  itemSelected,
}
