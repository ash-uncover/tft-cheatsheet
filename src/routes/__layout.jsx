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

import AppHeader from 'components/app/AppHeader'

import RouteHome from 'routes'
import RouteItems from 'routes/items'
import RouteChampions from 'routes/champions'
import RouteBuilds from 'routes/builds'
import RouteCompos from 'routes/compos'

import * as ServiceHelper from 'services/ServiceHelper'

const Root = () => {

  const dispatch = useDispatch()

  const status = useSelector(DataSelectors.status)

  useEffect(() => {
    ServiceHelper.loadData(dispatch)
  }, [])

  switch (status) {
    case DataStates.NEVER:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return <RouteHome />
    }
    case DataStates.SUCCESS: {
      return (
        <>
          <Router hashType='noslash'>
            <AppHeader />
            <Routes>
              <Route path='/' element={<RouteHome />} />
              <Route path='/items' element={<RouteItems />} />
              <Route path='/champions' element={<RouteChampions />} />
              <Route path='/builds' element={<RouteBuilds />} />
              <Route path='/compos' element={<RouteCompos />} />
            </Routes>
            <div className='app-footer'>
              footer
            </div>
          </Router>
        </>
      )
    }
    default: {
      return <RouteHome />
    }
  }
}

export default Root
