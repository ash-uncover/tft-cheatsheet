import React from 'react'

import {
  useSelector,
} from 'lib/hooks'

import {
  selectors as DataSelectors
} from 'store/data'

import Home from 'components/home/Home'
import HomeError from 'components/home/HomeError'
import HomeLoading from 'components/home/HomeLoading'

import DataStates from 'lib/constants/DataStates'

const RouteRoot = () => {

  const status = useSelector(DataSelectors.dataStatusSelector)

  switch (status) {
    case DataStates.NEVER:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return <HomeLoading />
    }
    case DataStates.SUCCESS: {
      return <Home />
    }
    default: {
      return <HomeError />
    }
  }
}

export default RouteRoot
