import React from 'react'

import {
  useDispatch,
  useSelector,
} from '../../lib/hooks'

import { DataSelectors } from '../../store/data/data.selectors'
import { ChampionsSlice } from '../../store/app/champions/champions.slice'
import { ChampionsSelectors } from '../../store/app/champions/champions.selectors'

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
  const championHover = useSelector(ChampionsSelectors.championHover)
  const championSelected = useSelector(ChampionsSelectors.championSelected)
  const originHover = useSelector(ChampionsSelectors.originHover)
  const originSelected = useSelector(ChampionsSelectors.originSelected)

  const originActive = originSelected || originHover
  const championActive = championSelected || championHover

  // Events
  const onMouseEnter = () => {
    dispatch(ChampionsSlice.actions.hoverOrigin({ ...origin }))
  }
  const onMouseLeave = () => {
    dispatch(ChampionsSlice.actions.unhoverOrigin())
  }
  const onClick = () => {
    if (originSelected?.id === origin.id) {
      dispatch(ChampionsSlice.actions.unselectOrigin())
    } else {
      dispatch(ChampionsSlice.actions.selectOrigin({ ...origin }))
    }
  }

  // Rendering
  const className = ['trait-tile']
  if (originActive?.id === origin.id) {
    className.push('highlight')
    className.push('origin')
  }
  if (championActive?.origins && championActive?.origins.includes(origin.id)) {
    className.push('highlight')
    className.push('origin')
  }
  return (
    <div
      className={className.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
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
  const championHover = useSelector(ChampionsSelectors.championHover)
  const championSelected = useSelector(ChampionsSelectors.championSelected)
  const classeHover = useSelector(ChampionsSelectors.classeHover)
  const classeSelected = useSelector(ChampionsSelectors.classeSelected)

  const classeActive = classeSelected || classeHover
  const championActive = championSelected || championHover

  // Events
  const onMouseEnter = () => {
    dispatch(ChampionsSlice.actions.hoverClass({ ...classe }))
  }
  const onMouseLeave = () => {
    dispatch(ChampionsSlice.actions.unhoverClass())
  }
  const onClick = () => {
    if (classeSelected?.id === classe.id) {
      dispatch(ChampionsSlice.actions.unselectClass())
    } else {
      dispatch(ChampionsSlice.actions.selectClass({ ...classe }))
    }
  }

  // Rendering
  const className = ['trait-tile']
  if (classeActive?.id === classe.id) {
    className.push('highlight')
    className.push('classe')
  }
  if (championActive?.classes && championActive?.classes.includes(classe.id)) {
    className.push('highlight')
    className.push('classe')
  }
  return (
    <div
      className={className.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
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

  const championHover = useSelector(ChampionsSelectors.championHover)
  const championSelected = useSelector(ChampionsSelectors.championSelected)
  const classeHover = useSelector(ChampionsSelectors.classeHover)
  const classeSelected = useSelector(ChampionsSelectors.classeSelected)
  const originHover = useSelector(ChampionsSelectors.originHover)
  const originSelected = useSelector(ChampionsSelectors.originSelected)

  const championActive = championSelected || championHover
  const classeActive = classeSelected || classeHover
  const originActive = originSelected || originHover

  // Events
  const onMouseEnter = () => {
    dispatch(ChampionsSlice.actions.hoverChampion({ ...champion }))
  }
  const onMouseLeave = () => {
    dispatch(ChampionsSlice.actions.unhoverChampion())
  }
  const onClick = () => {
    if (championSelected?.id === champion.id) {
      dispatch(ChampionsSlice.actions.unselectChampion())
    } else {
      dispatch(ChampionsSlice.actions.selectChampion({ ...champion }))
    }
  }

  // Rendering
  const className = ['champion-tile']
  if (championActive?.id === champion.id) {
    className.push('highlight')
    className.push('full')
  } else {
    if (championActive?.classes && championActive?.classes.some(c => champion.classes.includes(c))) {
      className.push('highlight')
      className.push('partial-classe')
    }
    if (championActive?.origins && championActive?.origins.some(o => champion.origins.includes(o))) {
      className.push('highlight')
      className.push('partial-origin')
    }
    if (champion.classes.includes(classeActive?.id)) {
      className.push('highlight')
      className.push('full-classe')
    }
    if (champion.origins.includes(originActive?.id)) {
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
