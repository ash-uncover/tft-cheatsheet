import type { AppState } from './app/app.state'
import type { DataState } from './data/data.state'

export interface RootState {
  app: AppState
  data: DataState
}
