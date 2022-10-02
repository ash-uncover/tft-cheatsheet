import React from 'react'

import {
  useDispatch,
} from 'lib/hooks'

import {
  actions as DataActions,
} from 'store/data'

import Champion from 'components/common/Champion'

const ComposListItem = ({ compo }) => {
  // Hooks

  const dispatch = useDispatch()

  // Events

  const onDeleteCompo = () => {
    dispatch(DataActions.deleteCompo(compo))
  }

  // Rendering

  return (
    <div className='compos-list-item app-page-section'>
      <div className='flex align-center justify-center'>
        <label>
          {compo.id}
        </label>
        <button
          onClick={onDeleteCompo}
          className='margin-left-auto'
        >
          <i className='fa-solid fa-trash'></i>
        </button>
      </div>
      <div className='compos-list-item-champions'>
        {compo.champions.map(id => <Champion key={id} id={id} />)}
      </div>
    </div>
  )
}

export default ComposListItem
