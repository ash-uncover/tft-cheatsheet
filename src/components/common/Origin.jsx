import React from 'react'

import './_origin.scss'

const Origin = ({
  id,
  name,
}) => {
  // Rendering
  const className = ['origin']
  return (
    <div
      className={className.join(' ')}
      title={name}
    >
      <img
        className='origin-image'
        src={`images/origins/${id}.svg`}
      />
    </div>
  )
}

export default Origin
