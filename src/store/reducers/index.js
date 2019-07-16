import { combineReducers } from 'redux'

import app from 'store/reducers/ReducerApp'
import data from 'store/reducers/ReducerData'

const index = combineReducers({
  app,
  data
})

export default index
