import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import './_builds.scss'

const Builds = () => {
  // Hooks
  const builds = useSelector(DataSelectors.dataBuildsSelector)
  const [search, setSearch] = useState('')

  // Rendering
  let buildsFiltered = builds
  if (search) {
    buildsFiltered = builds.filter(build => build.id.includes(search.toUpperCase()))
  }
  return (
    <div className='app-content builds'>
      <div className='builds-container'>
        <div className='builds-header'>
          <input
            className='builds-search'
            value={search}
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='builds-save'>
            +
          </button>
        </div>
        {buildsFiltered.map(build => <Build key={build.id} build={build} />)}
      </div>
    </div>
  )
}

const Build = ({ build }) => {
  // Hooks
  const champion = useSelector(DataSelectors.dataChampionSelector(build.id))

  // Rendering
  return (
    <div className='build'>
      <div className='build-infos'>
        {champion.name}
      </div>
      {build.items.map(item => (
        <BuildItem
          key={item.id}
          id={item.id}
          value={item.value}
        />
      ))}
      {build.items.length < 5 ?
        <button className='build-items-add'>
          +
        </button>
      : null}
    </div>
  )
}

const BuildItem = ({ id, value }) => {
  // Hooks
  const item = useSelector(DataSelectors.dataItemSelector(id))

  // Rendering
  return (
    <div className='build-item'>
      <div className='build-item-name'>
        {item.name}
      </div>
      <div className='build-item-info'>
        <img src={`images/items/${item.image}`} />
        <span>{value}%</span>
      </div>
    </div>
  )
}

export default Builds
