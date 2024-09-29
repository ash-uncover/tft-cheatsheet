import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

// Should be imported before first access to the reducers
import store from 'store'

import Root from 'routes/__layout'

import './_index.css'

const container = document.getElementById('react-root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
)
