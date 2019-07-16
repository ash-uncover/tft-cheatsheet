import React from 'react'
import { connect } from 'react-redux'

import ActionRegistry from 'core/ActionRegistry'

import ItemsTable from 'components/items/ItemsTable'
import ItemsDetails from 'components/items/ItemDetails'

import './_items.scss'

class ItemsPage extends React.Component {
  render () {
    const {
      hasItemDetails
    } = this.props
    return (
      <div className='items-page'>
        <ItemsTable />
        <ItemsDetails />
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const {
    itemId
  } = state.app.itemsHover
  const props = {
    hasItemDetails: Boolean(itemId)
  }
  return props
}

export const mapDispatchToProps = dispatch => ({
})

const ItemsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsPage)

export default ItemsPageContainer
