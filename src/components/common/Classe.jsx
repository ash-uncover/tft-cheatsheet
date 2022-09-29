import React from 'react'

import './_classe.scss'

const Classe = ({
  id,
  name,
}) => {
  // Rendering
  const className = ['classe']
  return (
    <div
      className={className.join(' ')}
      title={name}
    >
      <img
        className='classe-image'
        src={`images/classes/${id}.svg`}
      />
    </div>
  )
}

export default Classe
