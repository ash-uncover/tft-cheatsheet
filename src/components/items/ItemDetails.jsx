import React from 'react'
import { connect } from 'react-redux'

import ActionRegistry from 'core/ActionRegistry'

import Container from 'components/commons/Container'

import './_items.scss'

class ItemDetails extends React.Component {
  buildBonuses () {
    const {
      itemBonuses
    } = this.props
    return itemBonuses.map(bonus => this.buildBonus(bonus))
  }

  buildBonus (bonus) {
    return (
      <div
        key={bonus.id}
        className='item-details-property item-details-bonus'>
        <div className='item-details-property-name'>
          {bonus.name}
        </div>
        <div className='item-details-property-value'>
          {bonus.format.replace('{0}', bonus.value)}
        </div>
      </div>
    )
  }

  buildRecipe () {
    const {
      itemIngredients
    } = this.props
    return itemIngredients.map(this.buildRecipeIngredient.bind(this))
  }

  buildRecipeIngredient (ingredient, index) {
    console.log()
    return (
      <div key={index}>
        {ingredient.name}
      </div>
    )
  }

  render () {
    const {
      item
    } = this.props
    if (item) {
      return (
        <Container className='item-details'>
          <div className='item-details-title'>
            {item.name}
          </div>
          <div className='item-details-image'>
            <img src={`/assets/images/items/${item.image}`} />
          </div>
          <div className='item-details-property item-details-recipe'>
            <div className='item-details-property-name'>
              Recipe
            </div>
            <div className='item-details-property-value'>
              {this.buildRecipe()}
            </div>
          </div>
          {this.buildBonuses()}
          <div className='item-details-property item-details-passive'>
            <div className='item-details-property-name'>
              Passive
            </div>
            <div className='item-details-property-value'>
              {item.passive}
            </div>
          </div>
        </Container>
      )
    }
    return (
      <Container className='item-details invisible' />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const {
    itemId
  } = state.app.itemsHover
  const {
    items,
    bonuses
  } = state.data
  const item = items.find(it => it.id === itemId)
  const itemIngredients = (item && item.ingredients || []).map(ingredient => items.find(it => it.id === ingredient))
  const itemBonuses = Object.keys(item && item.bonus || {})
    .map(itemBonus => bonuses.find(bon => bon.id === itemBonus))
    .map(bon => ({ ...bon, value: item.bonus[bon.id]}))
  const props = {
    item,
    itemIngredients,
    itemBonuses
  }
  return props
}

export const mapDispatchToProps = dispatch => ({
})

const ItemDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails)

export default ItemDetailsContainer
