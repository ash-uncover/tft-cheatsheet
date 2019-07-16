import React from 'react'

import Container from 'components/commons/Container'

class AppFooter extends React.Component {
  /* RENDERING */

  render () {
    return (
      <Container className='app-footer'>
        <div className='app-footer-spacer' />
        <div className='app-footer-item'>
          Copyright 2019, aSH
        </div>
      </Container>
    )
  }
}

export default AppFooter
