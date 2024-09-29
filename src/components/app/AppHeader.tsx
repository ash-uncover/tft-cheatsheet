import React from 'react'

import {
  useLocation,
} from '../../lib/hooks'

import {
  Link,
} from 'react-router-dom'

import './_app-header.css'

const AppHeader = () => {
  // Hooks
  const location = useLocation()

  // Rendering
  return (
    <div className='app-header'>
      <Link
        to='/'
        className={location.pathname === '/' ? 'selected' : ''}
      >
        home
      </Link>
      <Link
        to='/items'
        className={location.pathname.startsWith('/items') ? 'selected' : ''}
      >
        items
      </Link>
      <Link
        to='/champions'
        className={location.pathname.startsWith('/champions') ? 'selected' : ''}
      >
        champions
      </Link>
      <Link
        to='/builds'
        className={location.pathname.startsWith('/builds') ? 'selected' : ''}
      >
        builds
      </Link>
      <Link
        to='/compos'
        className={location.pathname.startsWith('/compos') ? 'selected' : ''}
      >
        compos
      </Link>
    </div>
  )
}

export default AppHeader
