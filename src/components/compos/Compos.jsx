import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import './_compos.scss'

const Compos = () => {
  // Hooks
  const compos = useSelector(DataSelectors.dataComposSelector)

  // Rendering
  return (
    <div className='app-content compos'>
      {compos.map(compo => <Compo key={compo.name} compo={compo} />)}
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
        {compo.champions.map(id => <CompoChampion key={id} id={id} />)}
      </div>
    </div>
  )
}

const CompoChampion = ({ id }) => {
  // Hooks
  const champion = useSelector(DataSelectors.dataChampionSelector(id))

  // Rendering
  return (
    <div className='compo-champion'>
      <div className='compo-champion-image'>
        <img src={`images/champions/${champion.id}.jpg`} />
      </div>
    </div>
  )
}


export default Compos
