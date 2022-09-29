import React from 'react'

import {
  useSelector,
  useState,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import AppPage from 'components/app/AppPage'
import Champion from 'components/common/Champion'
import Origin from 'components/common/Origin'

import { getCompoBonuses } from 'lib/utils/BonusUtils'

import './_builder.scss'
import Classe from '../common/Classe'

const Builder = () => {
  // Hooks
  const champions = useSelector(DataSelectors.champions)
  const classes = useSelector(DataSelectors.classes)
  const origins = useSelector(DataSelectors.origins)

  const [compoChampions, setCompoChampions] = useState([])

  const compoBonuses = getCompoBonuses(compoChampions, origins, classes)
  const compoSize = compoChampions.reduce((acc, champion) => {
    if (champion.classes.includes('DRAGON')) {
      return acc + 2
    }
    return acc + 1
  }, 0)

  // Events
  const onAddChampion = (champion) => {
    if (compoSize < 9 && !compoChampions.includes(champion)) {
      const newChamps = [...compoChampions, champion].sort((c1, c2) => {
        if(c1.tier !== c2.tier) {
          return c1.tier - c2.tier
        }
        return c1.name.localeCompare(c2.name)
      })
      setCompoChampions(newChamps)
    }
  }
  const onRemoveChampion = (champion) => {
    setCompoChampions(compoChampions.filter(c => c !== champion))
  }

  // Rendering
  return (
    <AppPage className='builder'>

      <div className='builder-section builder-compo'>
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
        <button className='builder-compo-button'>
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

const BuilderCompoClasseBonus = ({ id, type, bonus, value }) => {
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

const BuilderCompoOriginBonus = ({ id, type, bonus, value }) => {
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

export default Builder

