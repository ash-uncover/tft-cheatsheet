import React from 'react'

import './_champion.scss'

const Champion = ({
  id,
  name,
  tier,
}) => {
  // Rendering
  const className = ['champion']
  if (tier) {
    className.push('show-tier')
    className.push(`champion-tier-${tier}`)
  }
  return (
    <div
      className={className.join(' ')}
      title={name}
    >
      <img
        className='champion-image'
        src={`images/champions/${id}.jpg`}
      />
    </div>
  )
}

export default Champion
