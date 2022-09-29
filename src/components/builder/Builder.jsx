import React from 'react'

import {
  useSelector,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import AppPage from 'components/app/AppPage'
import Classe from 'components/common/Classe'
import Champion from 'components/common/Champion'
import Origin from 'components/common/Origin'

import './_builder.scss'

const Builder = () => {
  // Hooks
  const champions = useSelector(DataSelectors.champions)
  const classes = useSelector(DataSelectors.classes)
  const origins = useSelector(DataSelectors.origins)

  // Rendering
  return (
    <AppPage className='builder'>
      <div className='builder-selector'>
        {champions.map(champion => <Champion key={champion.id} {...champion} />)}
      </div>
      <div className='builder-selector'>
        {classes.map(classe => <Classe key={classe.id} {...classe} />)}
      </div>
      <div className='builder-selector'>
        {origins.map(origin => <Origin key={origin.id} {...origin} />)}
      </div>
      <div className='builder-area'>

      </div>
    </AppPage>
  )
}

export default Builder
