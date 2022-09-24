import {
  actions as DataActions,
} from 'store/data'

import DataService from 'services/DataService'

export const loadData = async (dispatch) => {
  dispatch(DataActions.dataLoadRequest())
  Promise.all([
    DataService.api.v1.data.champions.get(),
    DataService.api.v1.data.classes.get(),
    DataService.api.v1.data.items.get(),
    DataService.api.v1.data.origins.get(),
  ])
    .then(([{champions}, {classes}, {items}, {origins}]) => {
      dispatch(DataActions.dataLoadSuccess({ champions, classes, items, origins }))

    })
    .catch((error) => {
      dispatch(DataActions.dataLoadFailure({ error }))
    })
}