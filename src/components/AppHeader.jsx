import React from 'react'

import Container from 'components/commons/Container'

class AppHeader extends React.Component {
  /* RENDERING */

  render () {
    return (
      <div className='app-header'>
        <div className='app-header-item'>
          <i className='fas fa-khanda' />
          Champions
        </div>
        <div className='app-header-item'>
          <i className='fas fa-shield-alt' />
          Items
        </div>
        <div className='app-header-item'>
          <i className='fas fa-users' />
          Synergies
        </div>
      </div>
    )
  }
}

export default AppHeader
