import React from 'react'

import {
  useDispatch,
  useSelector,
} from 'lib/hooks'

import {
  actions as AppActions,
  selectors as AppSelectors,
} from 'store/app'

import {
  selectors as DataSelectors,
} from 'store/data'

import AppPage from 'components/app/AppPage'
import Champion from 'components/common/Champion'

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
        {champions.map((champion, index) => (
          <ChampionTile
            key={champion.id}
            champion={champion}
            index={index}
          />
        ))}
      </div>
    </AppPage>
  )
}

const OriginTile = ({ origin }) => {
  // Hooks
  const dispatch = useDispatch()
  const championHover = useSelector(AppSelectors.appChampionHoverSelector)
  const originHover = useSelector(AppSelectors.appOriginHoverSelector)

  // Events
  const onMouseEnter = () => {
    dispatch(AppActions.appOriginHover({ ...origin }))
  }
  const onMouseLeave = () => {
    dispatch(AppActions.appOriginHover({}))
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
        <img src={`images/origins/${origin.id}.svg`} />
      </div>
    </div>
  )
}

const ClasseTile = ({ classe }) => {
  // Hooks
  const dispatch = useDispatch()
  const championHover = useSelector(AppSelectors.appChampionHoverSelector)
  const classeHover = useSelector(AppSelectors.appClasseHoverSelector)

  // Events
  const onMouseEnter = () => {
    dispatch(AppActions.appClasseHover({ ...classe }))
  }
  const onMouseLeave = () => {
    dispatch(AppActions.appClasseHover({}))
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
        <img src={`images/classes/${classe.id}.svg`} />
      </div>
    </div>
  )
}

const ChampionTile = ({ champion }) => {
  // Hooks
  const dispatch = useDispatch()
  const championHover = useSelector(AppSelectors.appChampionHoverSelector)
  const classeHover = useSelector(AppSelectors.appClasseHoverSelector)
  const originHover = useSelector(AppSelectors.appOriginHoverSelector)

  // Events
  const onMouseEnter = () => {
    dispatch(AppActions.appChampionHover({ ...champion }))
  }
  const onMouseLeave = () => {
    dispatch(AppActions.appChampionHover({}))
  }

  // Rendering
  const className = ['champion-tile']
  if (championHover?.id === champion.id) {
    className.push('highlight')
    className.push('full')
  } else {
    if (championHover.classes && championHover.classes.some(c => champion.classes.includes(c))) {
      className.push('highlight')
      className.push('partial-classe')
    }
    if (championHover.origins && championHover.origins.some(o => champion.origins.includes(o))) {
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
    >
      <Champion
        id={champion.id}
        name={champion.name}
      />
    </div>
  )
}

export default Champions
