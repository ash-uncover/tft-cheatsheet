import { createStore } from 'redux'
import reducer from 'store/reducers'
import 'store/actions'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
