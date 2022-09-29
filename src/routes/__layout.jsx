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
import HomeError from 'components/home/HomeError'
import HomeLoading from 'components/home/HomeLoading'
import RouteHome from 'routes'
import RouteItems from 'routes/items'
import RouteChampions from 'routes/champions'
import RouteBuilds from 'routes/builds'
import RouteCompos from 'routes/compos'
import RouteBuilder from 'routes/builder'

import * as ServiceHelper from 'services/ServiceHelper'

const Root = () => {

  const dispatch = useDispatch()

  const dataLoadStatus = useSelector(DataSelectors.status)

  useEffect(() => {
    ServiceHelper.loadData(dispatch)
  }, [])

  switch (dataLoadStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return <HomeLoading />
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
              <Route path='/builder' element={<RouteBuilder />} />
            </Routes>
            <div className='app-footer'>
              footer
            </div>
          </Router>
        </>
      )
    }
    default: {
      return <HomeError />
    }
  }
}

export default Root
