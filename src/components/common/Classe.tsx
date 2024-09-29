import React from 'react'

import Hexagon from './Hexagon'

import './_classe.css'

const Classe = ({
  id,
  bonus,
}) => {
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
          className='classe-image'
          src={`images/classes/${id}.svg`}
        />
      </Hexagon>
    </div>
  )
}

export default Classe
