import React from 'react'

import {
  useSelector,
} from '../lib/hooks'

import {
  DataSelectors
} from '../store/data/data.selectors'

import Home from '../components/home/Home'
import HomeError from '../components/home/HomeError'
import HomeLoading from '../components/home/HomeLoading'

import DataStates from '../lib/constants/DataStates'

export const RouteHome = () => {

  const status = useSelector(DataSelectors.status)

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
