import React from 'react'

import {
  useState,
} from '../../lib/hooks'

import CompoBuilder from './CompoBuilder'

const CompoBuilderToggle = ({ onCreateCompo }) => {
  // Hooks

  const [showBuilder, setShowBuilder] = useState(false)

  // Events

  const onShowBuilder = () => {
    setShowBuilder(true)
  }

  const onHideBuilder = () => {
    setShowBuilder(false)
  }

  const onCreateCompoInternal = (compo) => {
    setShowBuilder(false)
    onCreateCompo(compo)
  }

  // Rendering

  if (showBuilder) {
    return (
      <div className='compos-section-builder app-page-section'>
        <CompoBuilder
          onCreateCompo={onCreateCompoInternal}
          onCancel={onHideBuilder}
        />
      </div>
    )
  }
  return (
    <button className='compos-section-add app-page-section' onClick={onShowBuilder}>
      Click to add a composition
    </button>
  )
}

export default CompoBuilderToggle
