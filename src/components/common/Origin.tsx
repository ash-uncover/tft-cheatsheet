import React from 'react'

import Hexagon from './Hexagon'

import './_origin.css'

interface OriginProps {
  id: string
  bonus: string
  draggable?: boolean
}
export const Origin = ({
  id,
  bonus,
  draggable
}: OriginProps) => {
  // Rendering
  const className = ['origin']
  className.push(`origin-${id.toLowerCase()}`)
  if (bonus) {
    className.push(bonus)
  }
  return (
    <div
      className={className.join(' ')}
      title={id}
    >
      <Hexagon>
        <img
          draggable={Boolean(draggable)}
          className='origin-image'
          src={`images/origins/${id}.svg`}
        />
      </Hexagon>
    </div>
  )
}
