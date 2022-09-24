import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector,
} from 'lib/hooks'

import {
  selectors as DataSelectors
} from 'store/data'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import DataStates from 'lib/constants/DataStates'

import HomeError from 'components/home/HomeError'
import HomeLoading from 'components/home/HomeLoading'
import RouteHome from 'routes'

const Root = () => {

  const dispatch = useDispatch()

  const dataLoadStatus = useSelector(DataSelectors.dataStatusSelector)

  useEffect(() => {
    //Service.loadData(dispatch)
  }, [])

  switch (dataLoadStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return <HomeLoading />
    }
    case DataStates.SUCCESS: {
      return (
        <Router hashType='noslash'>
          <Routes>
            <Route path='/' element={<RouteHome />} />
          </Routes>
        </Router>
      )
    }
    default: {
      return <HomeError />
    }
  }
}

export default Root
