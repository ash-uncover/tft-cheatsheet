import { ChampionsState } from './champions/champions.state'
import { ItemsState } from './items/items.state'

export interface AppState {
  champions: ChampionsState
  items: ItemsState
}
