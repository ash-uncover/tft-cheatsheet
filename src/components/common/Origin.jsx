import React from 'react'

import Hexagon from 'components/common/Hexagon'

import './_origin.css'

const Origin = ({
  id,
  name,
  bonus,
}) => {
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
          className='origin-image'
          src={`images/origins/${id}.svg`}
        />
      </Hexagon>
    </div>
  )
}

export default Origin
