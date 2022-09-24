import React from 'react'

import {
  useDispatch,
  useSelector,
  useState,
} from 'lib/hooks'

import './Home.scss'

import {
  actions as AppActions,
  selectors as AppSelectors,
} from 'store/app'

import {
  selectors as DataSelectors,
} from 'store/data'

const Home = () => {

  const items = useSelector(DataSelectors.dataItemsSelector)
  const itemsBase = items.filter(item => !item.isComplex)

  const itemsMatrix = [[null, ...itemsBase]]
  itemsBase.forEach(itemBase => {
    const itemsRow = [itemBase]
    itemsBase.forEach(itemBase2 => {
      const item = items.find(item => {
        if (itemBase.id === itemBase2.id) {
          return item.ingredients[0] === itemBase.id && item.ingredients[1] === itemBase.id
        }
        return item.ingredients.includes(itemBase.id) && item.ingredients.includes(itemBase2.id)
      })
      itemsRow.push(item)
    })
    itemsMatrix.push(itemsRow)
  })
  return (
    <div className='home'>
      <ItemsTable itemRows={itemsMatrix} />
    </div>
  )
}

const ItemsTable = ({ itemRows }) => {
  const renderRow = (items, index) => {
    return (
      <ItemsTableRow
        key={`row-${index}`}
        indexRow={index}
        items={items}
      />
    )
  }
  return (
    <div className='items-table'>
      {itemRows.map(renderRow)}
    </div>
  )
}

const ItemsTableRow = ({ items, indexRow }) => {
  const renderCell = (item, index) => {
    return (
      <ItemsTableCell
        key={`item-${index}`}
        item={item}
        indexRow={indexRow}
        indexCol={index}
      />
    )
  }
  return (
    <div className='items-table-row'>
      {items.map(renderCell)}
    </div>
  )
}

const ItemsTableCell = ({ item, indexRow, indexCol }) => {
  // Hooks
  const dispatch = useDispatch()
  const itemsHover = useSelector(AppSelectors.appItemsHoverSelector)

  // Events
  const onMouseEnter = () => {
    dispatch(AppActions.appItemsHover({
      itemId: item.id,
      indexRow,
      indexCol,
    }))
  }
  const onMouseLeave = () => {
    dispatch(AppActions.appItemsHover({
      itemId: null,
      indexRow: null,
      indexCol: null,
    }))
  }

  // Rendering
  const className = ['items-table-cell']
  if (!item) {
    className.push('empty')
  }
  if (item?.isComplex) {
    className.push('complex')
  } else {
    className.push('basic')
  }
  if (indexRow === itemsHover.indexRow && indexCol === itemsHover.indexCol) {
    className.push('highlight')
  } else if (indexRow === itemsHover.indexRow || indexCol === itemsHover.indexCol) {
    className.push('highlight-partial')
  }
  return (
    <div
      className={className.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item && <img src={`images/items/${item.image}`} />}
    </div>
  )
}

export default Home
