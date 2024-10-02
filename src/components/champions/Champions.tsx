import React from 'react'

import {
  useDispatch,
  useSelector,
} from '../../lib/hooks'

import { 
  AppSelectors
} from '../../store/app/app.selectors'
import { 
  AppSlice 
} from '../../store/app/app.slice'
import { 
  DataSelectors
} from '../../store/data/data.selectors'

import AppPage from '../app/AppPage'
import { Champion } from '../common/Champion'

import './_champions.css'

const Champions = () => {

  const champions = useSelector(DataSelectors.champions)
  const classes = useSelector(DataSelectors.classes)
  const origins = useSelector(DataSelectors.origins)

  return (
    <AppPage className='champions'>
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
        {Object.values(champions)
          .sort((champion1, champion2) => {
            return champion1.tier - champion2.tier || champion1.name.localeCompare(champion2.name)
          })
          .map((champion, index) => (
            <ChampionTile
              key={champion.id}
              champion={champion}
            />
          ))}
      </div>
    </AppPage>
  )
}

const OriginTile = ({ origin }) => {
  // Hooks
  const dispatch = useDispatch()
  const championHover = useSelector(AppSelectors.championHover)
  const originHover = useSelector(AppSelectors.originHover)

  // Events
  const onMouseEnter = () => {
    dispatch(AppSlice.actions.hoverOrigin({ ...origin }))
  }
  const onMouseLeave = () => {
    dispatch(AppSlice.actions.hoverOrigin({}))
  }

  // Rendering
  const className = ['trait-tile']
  if (originHover.id === origin.id) {
    className.push('highlight')
    className.push('origin')
  }
  if (championHover?.origins && championHover?.origins.includes(origin.id)) {
    className.push('highlight')
    className.push('origin')
  }
  return (
    <div
      className={className.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='trait-tile-content'>
        <img draggable={false} src={`images/traits/TFT12_${origin.id}.svg`} />
      </div>
    </div>
  )
}

const ClasseTile = ({ classe }) => {
  // Hooks
  const dispatch = useDispatch()
  const championHover = useSelector(AppSelectors.championHover)
  const classeHover = useSelector(AppSelectors.classeHover)

  // Events
  const onMouseEnter = () => {
    dispatch(AppSlice.actions.hoverClass({ ...classe }))
  }
  const onMouseLeave = () => {
    dispatch(AppSlice.actions.hoverClass({}))
  }

  // Rendering
  const className = ['trait-tile']
  if (classeHover.id === classe.id) {
    className.push('highlight')
    className.push('classe')
  }
  if (championHover?.classes && championHover?.classes.includes(classe.id)) {
    className.push('highlight')
    className.push('classe')
  }
  return (
    <div
      className={className.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='trait-tile-content'>
        <img draggable={false} src={`images/traits/TFT12_${classe.id}.svg`} />
      </div>
    </div>
  )
}

const ChampionTile = ({ champion }) => {
  // Hooks
  const dispatch = useDispatch()

  const championHover = useSelector(AppSelectors.championHover)
  const classeHover = useSelector(AppSelectors.classeHover)
  const originHover = useSelector(AppSelectors.originHover)

  const championSelected = useSelector(AppSelectors.championSelected)

  const championActive = championSelected.id ? championSelected : championHover

  // Events
  const onMouseEnter = () => {
    dispatch(AppSlice.actions.hoverChampion({ ...champion }))
  }
  const onMouseLeave = () => {
    dispatch(AppSlice.actions.unhoverChampion())
  }
  const onClick = () => {
    if (championSelected.id === champion.id) {
      dispatch(AppSlice.actions.unselectChampion())
    } else {
      dispatch(AppSlice.actions.selectChampion({ ...champion }))
    }
  }

  // Rendering
  const className = ['champion-tile']
  if (championActive.id === champion.id) {
    className.push('highlight')
    className.push('full')
  } else {
    if (championActive.classes && championActive.classes.some(c => champion.classes.includes(c))) {
      className.push('highlight')
      className.push('partial-classe')
    }
    if (championActive.origins && championActive.origins.some(o => champion.origins.includes(o))) {
      className.push('highlight')
      className.push('partial-origin')
    }
    if (champion.classes.includes(classeHover?.id)) {
      className.push('highlight')
      className.push('full-classe')
    }
    if (champion.origins.includes(originHover?.id)) {
      className.push('highlight')
      className.push('full-origin')
    }
  }
  return (
    <div
      className={className.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Champion id={champion.id} />
    </div>
  )
}

export default Champions
