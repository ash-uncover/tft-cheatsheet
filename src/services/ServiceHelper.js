import {
  actions as DataActions,
} from 'store/data'

import DataService from 'services/DataService'

export const loadData = async (dispatch) => {
  dispatch(DataActions.dataLoadRequest())
  Promise.all([
    DataService.api.v1.data.builds.get(),
    DataService.api.v1.data.champions.get(),
    DataService.api.v1.data.classes.get(),
    DataService.api.v1.data.compos.get(),
    DataService.api.v1.data.items.get(),
    DataService.api.v1.data.origins.get(),
  ])
    .then(([{builds}, {champions}, {classes}, {compos}, {items}, {origins}]) => {
      dispatch(DataActions.dataLoadSuccess({ builds, champions, classes, compos, items, origins }))

    })
    .catch((error) => {
      dispatch(DataActions.dataLoadFailure({ error }))
    })
}