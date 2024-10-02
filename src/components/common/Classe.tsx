import React from 'react'

import Hexagon from './Hexagon'

import './_classe.css'

interface ClasseProps {
  id: string
  bonus: string
  draggable?: boolean
}
export const Classe = ({
  id,
  bonus,
  draggable
}: ClasseProps) => {
  // Rendering
  const className = ['classe']
  className.push(`classe-${id.toLowerCase()}`)
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
          className='classe-image'
          src={`images/classes/${id}.svg`}
        />
      </Hexagon>
    </div>
  )
}
