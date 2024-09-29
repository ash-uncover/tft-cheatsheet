import React from 'react'

import './_item.css'

const Item = ({
  id,
  name,
}) => {
  // Rendering
  const className = ['item']
  return (
    <div
      className={className.join(' ')}
      title={name}
    >
      <img
        className='item-image'
        src={`images/items/${id}.jpg`}
      />
    </div>
  )
}

export default Item
