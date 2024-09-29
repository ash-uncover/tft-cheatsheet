import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from 'lib/hooks'

import {
  selectors as DataSelectors,
} from 'store/data'

import AppPage from 'components/app/AppPage'

import './_builds.css'

const Builds = () => {
  // Hooks
  const builds = useSelector(DataSelectors.builds)
  const [search, setSearch] = useState('')

  // Rendering
  let buildsFiltered = builds
  if (search) {
    buildsFiltered = builds.filter(build => {
      const bChampionMatch = build.id.includes(search.toUpperCase())
      const bItemMatch = build.items.some(item => item.id.includes(search.toUpperCase()))
      return bChampionMatch ||  bItemMatch
    })
  }
  return (
    <AppPage className='builds'>
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
    </AppPage>
  )
}

const Build = ({ build }) => {
  // Hooks
  const champion = useSelector(DataSelectors.champion(build.id))

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
  const item = useSelector(DataSelectors.item(id))

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
