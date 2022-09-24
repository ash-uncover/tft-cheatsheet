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
  const classes = useSelector(DataSelectors.dataClassesSelector)
  const origins = useSelector(DataSelectors.dataOriginsSelector)
  console.log(classes)
  console.log(origins)
  return (
    <div className='app-content champions'>
      <div className='champions-content'>
        <div className='champions-section trait-tiles'>
          {origins.map(origin => (
            <OriginTile
              key={origin.id}
              origin={origin}
            />
          ))}
        </div>
        <div className='champions-section trait-tiles'>
          {classes.map(classe => (
            <ClasseTile
              key={classe.id}
              classe={classe}
            />
          ))}
        </div>
        <div className='champions-section champion-tiles'>
          {champions.map((champion, index) => (
            <ChampionTile
              key={champion.id}
              champion={champion}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const OriginTile = ({ origin }) => {
  return (
    <div className='trait-tile'>
      <div className='trait-tile-content'>
        <img src={`images/origins/${origin.id}.svg`} />
      </div>
    </div>
  )
}

const ClasseTile = ({ classe }) => {
  return (
    <div className='trait-tile'>
      <div className='trait-tile-content'>
        <img src={`images/classes/${classe.id}.svg`} />
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
