import React from 'react'

import {
  useSelector,
  useState,
} from '../../lib/hooks'

import { 
  DataSelectors
} from '../../store/data/data.selectors'

import { Champion } from '../common/Champion'
import { Classe } from '../common/Classe'
import { Origin } from '../common/Origin'

import BonusUtils from '../../lib/utils/BonusUtils'
import ChampionUtils from '../../lib/utils/ChampionUtils'

const CompoBuilder = ({ onCreateCompo, onCancel }) => {
  // Hooks

  const compos = useSelector(DataSelectors.compos)
  const champions = useSelector(DataSelectors.champions)
  const classes = useSelector(DataSelectors.classes)
  const origins = useSelector(DataSelectors.origins)

  const [compoChampions, setCompoChampions] = useState([])
  const [compoName, setCompoName] = useState('')

  const compoBonuses = BonusUtils.getCompoBonuses(compoChampions, origins, classes)
  const compoSize = ChampionUtils.getTeamSize(compoChampions)

  const saveEnabled = compoName.trim() && compoSize

  // Events

  const onAddChampion = (champion) => {
    if (compoSize < 9 && !compoChampions.includes(champion)) {
      const newChampions = ChampionUtils.sortChampions([...compoChampions, champion])
      setCompoChampions(newChampions)
    }
  }

  const onRemoveChampion = (champion) => {
    const newChampions = compoChampions.filter(c => c !== champion)
    setCompoChampions(newChampions)
  }

  const onAddCompo = () => {
    const champions = ChampionUtils.extractIds(compoChampions)
    onCreateCompo({
      id: compoName,
      champions
    })
  }

  // Rendering

  return (
    <div className='compo-section-builder'>

      <div className='compo-builder-section flex align-center'>
        <h2>New Team Composition</h2>
        <input
          className='margin-left-auto'
          placeholder='Enter name'
          value={compoName}
          onChange={(e) => setCompoName(e.target.value)}
        />
        <button
          className='compo-builder-compo-button cursor-pointer'
          disabled={!saveEnabled}
          onClick={onAddCompo}
        >
          <i className='fa-solid fa-floppy-disk'></i>
        </button>
      </div>

      <div className='compo-builder-section compo-builder-compo'>
        {compoBonuses.map(bonus => (
          <BuilderCompoBonus
            key={bonus.id}
            {...bonus}
          />
        ))}
        {compoChampions
          .sort((c1, c2) => (c1.tier - c2.tier) || c1.name.localeCompare(c2.name))
          .map(champion => (
            <BuilderCompoChampion
              key={champion.id}
              champion={champion}
              onClick={() => onRemoveChampion(champion)}
            />
          ))
        }

      </div>

      <div className='compo-builder-section compo-builder-selector'>
        {Object.values(champions).map(champion => (
          <BuilderSelectorChampion
            key={champion.id}
            champion={champion}
            selected={compoChampions.includes(champion)}
            onClick={() => onAddChampion(champion)}
          />
        ))}
      </div>

    </div>
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
    <div className='compo-builder-compo-bonus'>
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
    <div className='compo-builder-compo-bonus'>
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
      className='compo-builder-compo-champion'
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
  const classArray=['compo-builder-selector-champion']
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

