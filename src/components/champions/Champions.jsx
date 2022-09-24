import React from 'react'

import {
  useDispatch,
  useSelector,
} from 'lib/hooks'

import './_champions.scss'

import {
  actions as AppActions,
  selectors as AppSelectors,
} from 'store/app'

import {
  selectors as DataSelectors,
} from 'store/data'

const Champions = () => {

  return (
    <div className='app-content champions'>
      champions
    </div>
  )
}

export default Champions
