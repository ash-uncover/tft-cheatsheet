import React from 'react'
import { connect } from 'react-redux'

import ActionRegistry from 'core/ActionRegistry'

import './_items.scss'

class ItemsTableCell extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  /* VIEW CALLBACKS */

  onClick () {
    const {
      itemId,
      indexRow,
      indexCol,
      isSelected
    } = this.props
    if (isSelected) {
      this.props.onUnselect()
    } else {
      this.props.onSelect(itemId, indexRow, indexCol)
    }
  }

  onMouseEnter () {
    const {
      itemId,
      indexRow,
      indexCol
    } = this.props
    this.props.onMouseEnter(itemId, indexRow, indexCol)
  }

  onMouseLeave () {
    this.props.onMouseLeave()
  }

  /* RENDERING */

  buildClassName () {
    let result = 'items-table-cell'
    const {
      isHeader,
      indexRow,
      indexCol,
      hasSelection,
      isRowSelected,
      isColSelected,
      isSelected,
      isSelectionLocked
    } = this.props
    if (isSelected) {
      result += ' selected'
    } else if (isRowSelected && isColSelected) {
      result += ' hovered'
    } else if (isRowSelected) {
      if (isHeader) {
        result += ' hovered-header'
      } else {
        result += ' hovered-row'
      }
    } else if (isColSelected) {
      if (isHeader) {
        result += ' hovered-header'
      } else {
        result += ' hovered-col'
      }
    } else if (hasSelection) {
      result += ' unselected'
    }
    if (indexRow == 0) {
      result += ' first-row'
    }
    if (indexCol == 0) {
      result += ' first-col'
    }
    return result
  }

  render () {
    const {
      item
    } = this.props
    return (
      <div
        className={this.buildClassName()}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}>
        { item ?
          <img src={`assets/images/items/${item.image}`} />
        :
          null
        }
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const {
    itemId,
    indexRow,
    indexCol
  } = ownProps
  const item = state.data.items.find(it => it.id === itemId)
  const isHeader = indexRow === 0 || indexCol === 0
  let isRowSelected = false
  let isColSelected = false
  let hasSelection = false
  if (state.app.itemsHover.indexRow) {
    hasSelection = true
    isRowSelected = state.app.itemsHover.indexRow === indexRow
  }
  if (state.app.itemsHover.indexCol) {
    hasSelection = true
    isColSelected = state.app.itemsHover.indexCol === indexCol
  }
  const isSelectionLocked = state.app.itemsHover.locked
  const isSelected = isRowSelected && isColSelected && state.app.itemsHover.locked
  const props = {
    isHeader,
    indexRow,
    indexCol,
    hasSelection,
    isRowSelected,
    isColSelected,
    isSelected,
    isSelectionLocked,
    item
  }
  return props
}

export const mapDispatchToProps = dispatch => ({
  onMouseEnter: (itemId, indexRow, indexCol) => dispatch(ActionRegistry.appItemsHover(itemId, indexRow, indexCol)),
  onMouseLeave: () => dispatch(ActionRegistry.appItemsHover()),
  onSelect: (itemId, indexRow, indexCol) => dispatch(ActionRegistry.appItemsSelect(itemId, indexRow, indexCol)),
  onUnselect: () => dispatch(ActionRegistry.appItemsSelect())
})

const ItemsTableCellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsTableCell)

export default ItemsTableCellContainer
