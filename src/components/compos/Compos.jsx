import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from 'lib/hooks'

import {
  actions as DataActions,
  selectors as DataSelectors,
} from 'store/data'

import AppPage from 'components/app/AppPage'
import AppPageSection from 'components/app/AppPageSection'

import CompoBuilderToggle from './CompoBuilderToggle'
import ComposListItem from './ComposListItem'

import * as ServiceHelper from 'services/ServiceHelper'

import './_compos.scss'

const Compos = () => {
  // Hooks

  const dispatch = useDispatch()

  const compos = useSelector(DataSelectors.compos)
  const status = useSelector(DataSelectors.status)

  // Events

  const onRefresh = () => {
    ServiceHelper.loadData(dispatch, true)
  }

  const onImport = (event) => {
    const file = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = function () {
      const data = JSON.parse(fileReader.result)
      dispatch(DataActions.importCompos(data))
    }
    fileReader.readAsText(file)
  }

  const onExport = () => {
    const element = document.createElement('a')
    const data = JSON.stringify({ compos }, null, '  ')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
    element.setAttribute('download', 'compos.json')

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  const onCreateCompo = (compo) => {
    dispatch(DataActions.createCompo({ compo }))
  }

  // Rendering
  return (
    <AppPage className='compos'>

      <AppPageSection className='compos-section-header'>
        <h1>Team Composition</h1>
        <button
          className='compos-action'
          title='Reset'
          onClick={onRefresh}
        >
          <i className='fa-solid fa-arrows-rotate'></i>
        </button>
        <input
          className='hidden'
          type='file'
          id='importCompoFile'
          accept='application/json'
          onChange={onImport}
        />
        <label
          className='compos-action'
          title='Import from file'
          htmlFor='importCompoFile'
        >
          <i className='fa-solid fa-upload'></i>
        </label>
        <button
          className='compos-action'
          title='Export to file'
          onClick={onExport}
        >
          <i className='fa-solid fa-download'></i>
        </button>
      </AppPageSection>

      <CompoBuilderToggle
        onCreateCompo={onCreateCompo}
      />

      {compos.map(compo => <ComposListItem key={compo.id} compo={compo} />)}

    </AppPage>
  )
}

export default Compos
