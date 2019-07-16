import React from 'react'

import Container from 'components/commons/Container'
import ItemsPage from 'components/items/ItemsPage'

class AppContent extends React.Component {
  /* RENDERING */

  render () {
    return (
      <Container className='app-content'>
        <ItemsPage />
      </Container>
    )
  }
}

export default AppContent
