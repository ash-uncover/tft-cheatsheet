import React from 'react'
import { connect } from 'react-redux'

import ItemsTableCell from 'components/items/ItemsTableCell'

import './_items.scss'

class ItemsTable extends React.Component {
  _buildTableHeaderRow () {
    return (
      <div className='items-table-row'>
        <ItemsTableCell
          indexRow={0}
          indexCol={0} />
        {this.props.itemsBase.map((item, index) => (
          <ItemsTableCell
            key={item.id}
            indexRow={0}
            indexCol={index + 1}
            itemId={item.id} />
        ))}
      </div>
    )
  }

  _buildTableRows () {
    return this.props.itemsBase.map((item, index) => this._buildTableRow(item, index + 1))
  }

  _buildTableRow (itemBase, index) {
    return (
      <div
        key={`row-${itemBase.id}`}
        className='items-table-row'>
        <ItemsTableCell
          indexRow={index}
          indexCol={0}
          itemId={itemBase.id} />
        {this._buildTableRowCells(itemBase, index)}
      </div>
    )
  }

  _buildTableRowCells (itemBase, indexRow) {
    const subItems = this.props.itemsBase.map(itemBase2 => {
      return this.props.itemsComplex.find(item => {
        if (itemBase === itemBase2) {
          return item.ingredients[0] === itemBase.id && item.ingredients[1] === itemBase.id
        }
        const hasItemBase = item.ingredients[0] === itemBase.id || item.ingredients[1] === itemBase.id
        const hasItemBase2 = item.ingredients[0] === itemBase2.id || item.ingredients[1] === itemBase2.id
        const result = hasItemBase && hasItemBase2
        return result
      })
    }, [])
    return subItems.map((item, index) => (
      <ItemsTableCell
        key={item.id}
        indexRow={indexRow}
        indexCol={index + 1}
        itemId={item.id} />
    ))
  }

  render () {
    return (
      <div className='items-table'>
        {this._buildTableHeaderRow()}
        {this._buildTableRows()}
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  const items = state.data.items
  const itemsBase = items.filter(item => !item.isComplex)
  const itemsComplex = items.filter(item => item.isComplex)
  const props = {
    itemsBase,
    itemsComplex
  }
  return props
}

export const mapDispatchToProps = dispatch => ({
})

const ItemsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsTable)

export default ItemsTableContainer
