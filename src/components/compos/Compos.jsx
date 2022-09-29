import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import Champion from 'components/common/Champion'

import './_compos.scss'

const Compos = () => {
  // Hooks
  const compos = useSelector(DataSelectors.compos)

  // Rendering
  return (
    <div className='app-content compos'>
      <div className='compos-container'>
        {compos.map(compo => <Compo key={compo.name} compo={compo} />)}
      </div>
    </div>
  )
}

const Compo = ({ compo }) => {
  // Hooks

  // Rendering
  return (
    <div className='compo'>
      {compo.name}
      <div className='compo-champions'>
        {compo.champions.map(id => <Champion key={id} id={id} />)}
      </div>
    </div>
  )
}

export default Compos
