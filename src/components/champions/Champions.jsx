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

  const champions = useSelector(DataSelectors.dataChampionsSelector)
  console.log(champions)
  return (
    <div className='app-content champions'>
      <div className='champion-tiles'>
        {champions.map((champion, index) => (
          <ChampionTile
            key={champion.id}
            champion={champion}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

const ChampionTile = ({ champion, index }) => {
  return (
    <div className='champion-tile'>
      <div className='champion-tile-content'>
        <img src={`images/champions/${champion.id}.jpg`} />
      </div>
    </div>
  )
}

export default Champions
