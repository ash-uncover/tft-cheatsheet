import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from '../../lib/hooks'

import { 
  DataSelectors
} from '../../store/data/data.selectors'
import { 
  DataSlice 
} from '../../store/data/data.slice'

import AppPage from '../app/AppPage'
import Champion from '../common/Champion'
import Classe from '../common/Classe'
import Origin from '../common/Origin'

import { getCompoBonuses } from '../../lib/utils/BonusUtils'

import './_builder.css'

const CompoBuilder = () => {
  // Hooks
  const dispatch = useDispatch()

  const compos = useSelector(DataSelectors.compos)
  const champions = useSelector(DataSelectors.champions)
  const classes = useSelector(DataSelectors.classes)
  const origins = useSelector(DataSelectors.origins)

  const [compoChampions, setCompoChampions] = useState([])
  const [compoName, setCompoName] = useState('')

  const compoBonuses = getCompoBonuses(compoChampions, origins, classes)
  const compoSize = compoChampions.reduce((acc, champion) => {
    if (champion.classes.includes('DRAGON')) {
      return acc + 2
    }
    return acc + 1
  }, 0)

  const saveEnabled = compoName.trim() && compoChampions.length

  // Events
  const onAddChampion = (champion) => {
    if (compoSize < 9 && !compoChampions.includes(champion)) {
      const newChamps = [...compoChampions, champion].sort((champion1, champion2) => {
        if(champion1.tier !== champion2.tier) {
          return champion1.tier - champion2.tier
        }
        return champion1.name.localeCompare(champion2.name)
      })
      setCompoChampions(newChamps)
    }
  }
  const onRemoveChampion = (champion) => {
    setCompoChampions(compoChampions.filter(c => c !== champion))
  }
  const onAddCompo = () => {
    dispatch(DataSlice.actions.createCompo({
      compo: {
        id: compoName,
        champions: compoChampions.map(champion => champion.id)
      }
    }))
  }

  // Rendering
  return (
    <AppPage className='builder'>

      <div className='builder-section builder-compo'>
        <input
          placeholder='Enter name'
          value={compoName}
          onChange={(e) => setCompoName(e.target.value)}
        />
        {compoBonuses.map(bonus => (
          <BuilderCompoBonus
            key={bonus.id}
            {...bonus}
          />
        ))}
        {compoChampions.map(champion => (
          <BuilderCompoChampion
            key={champion.id}
            champion={champion}
            onClick={() => onRemoveChampion(champion)}
          />
        ))}
        <button
          className='builder-compo-button'
          disabled={!saveEnabled}
          onClick={onAddCompo}
        >
          save
        </button>
      </div>

      <div className='builder-section builder-selector'>
        {champions.map(champion => (
          <BuilderSelectorChampion
            key={champion.id}
            champion={champion}
            selected={compoChampions.includes(champion)}
            onClick={() => onAddChampion(champion)}
          />
        ))}
      </div>

    </AppPage>
  )
}

const BuilderCompoBonus = ({ id, type, bonus, value }) => {
  switch (type) {
    case 'classe': return <BuilderCompoClasseBonus id={id} bonus={bonus} value={value} />
    case 'origin': return <BuilderCompoOriginBonus id={id} bonus={bonus} value={value} />
    default: return null
  }
}

const BuilderCompoClasseBonus = ({ id, bonus, value }) => {
  return (
    <div className='builder-compo-bonus'>
      <Classe
        id={id}
        bonus={bonus}
      />
      {value}
    </div>
  )
}

const BuilderCompoOriginBonus = ({ id, bonus, value }) => {
  return (
    <div className='builder-compo-bonus'>
      <Origin
        id={id}
        bonus={bonus}
      />
      {value}
    </div>
  )
}

const BuilderCompoChampion = ({
  champion,
  onClick,
}) => {
  return (
    <div
      className='builder-compo-champion'
      onClick={onClick}
    >
      <Champion {...champion} />
    </div>
  )
}

const BuilderSelectorChampion = ({
  champion,
  selected,
  onClick,
}) => {
  // Rendering
  const classArray=['builder-selector-champion']
  if (selected) {
    classArray.push('selected')
  }
  return (
    <div
      title='toto'
      className={classArray.join(' ')}
      onClick={() => !selected && onClick()}
    >
      <Champion {...champion} />
    </div>
  )
}

export default CompoBuilder

