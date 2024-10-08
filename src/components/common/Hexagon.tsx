import React from 'react'

import './_hexagon.css'

const Hexagon = ({ children }) => {
  return (
    <div className='hexagon'>
      <div className='layer layer-border'>
        <div className='layer layer-content'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Hexagon
