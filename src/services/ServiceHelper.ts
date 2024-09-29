import { 
  DataSlice 
} from '../store/data/data.slice'

import { 
  DataService 
} from './DataService'

export const loadData = async (dispatch, refresh = false) => {
  dispatch(DataSlice.actions.loadRequest({}))
  Promise.all([
    DataService.api.v1.data.builds.get(),
    DataService.api.v1.data.champions.get(),
    DataService.api.v1.data.classes.get(),
    DataService.api.v1.data.compos.get(),
    DataService.api.v1.data.items.get(),
    DataService.api.v1.data.origins.get(),
  ])
    .then(([{builds}, {champions}, {classes}, {compos}, {items}, {origins}]) => {
      dispatch(DataSlice.actions.loadSuccess({ builds, champions, classes, compos, items, origins, refresh }))

    })
    .catch((error) => {
      dispatch(DataSlice.actions.loadFailure({ error }))
    })
}