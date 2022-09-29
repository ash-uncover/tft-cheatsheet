import React from 'react'

import {
  useSelector,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import Champion from 'components/common/Champion'

import './_builder.scss'

const Builder = () => {
  // Hooks
  const champions = useSelector(DataSelectors.dataChampionsSelector)
  const classes = useSelector(DataSelectors.dataClassesSelector)
  const origins = useSelector(DataSelectors.dataOriginsSelector)

  // Rendering
  return (
    <div className='app-content builder'>
      <div className='builder-container'>
        <div className='builder-selector'>
          {champions.map(champion => (
            <Champion
              key={champion.id}
              {...champion}
            />
          ))}
        </div>
        <div className='builder-area'>

        </div>
      </div>
    </div>
  )
}

export default Builder
