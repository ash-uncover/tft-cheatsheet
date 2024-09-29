import React from 'react'

import {
  useLocation,
} from 'lib/hooks'

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
        className={location.pathname === '/' ? 'selected' : null}
      >
        home
      </Link>
      <Link
        to='/items'
        className={location.pathname.startsWith('/items') ? 'selected' : null}
      >
        items
      </Link>
      <Link
        to='/champions'
        className={location.pathname.startsWith('/champions') ? 'selected' : null}
      >
        champions
      </Link>
      <Link
        to='/builds'
        className={location.pathname.startsWith('/builds') ? 'selected' : null}
      >
        builds
      </Link>
      <Link
        to='/compos'
        className={location.pathname.startsWith('/compos') ? 'selected' : null}
      >
        compos
      </Link>
    </div>
  )
}

export default AppHeader
