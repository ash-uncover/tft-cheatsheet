import React from 'react'
import { useSelector } from 'react-redux'
import { DataSelectors } from '../../store/data/data.selectors'
import './_champion.css'

interface ChampionProps {
  id: string
  draggable?: boolean
}
export const Champion = ({
  id,
  draggable
}: ChampionProps) => {
  
  // #region hooks
  const champion = useSelector(DataSelectors.champion(id))
  // #endregion

  // #region Rendering
  const className = ['champion']
  if (champion.tier) {
    className.push('show-tier')
    className.push(`champion-tier-${champion.tier}`)
  }
  return (
    <div
      className={className.join(' ')}
      title={champion.name}
    >
      <img
        draggable={Boolean(draggable)}
        className='champion-image'
        src={`images/champions/${champion.id}_${champion.skin}.png`}
      />
    </div>
  )
  // #endregion
}