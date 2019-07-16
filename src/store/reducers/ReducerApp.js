import ActionRegistry from 'core/ActionRegistry'

export const getDefaultState = () => ({
  itemsHover: {}
})

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case ActionRegistry.APP_ITEMS_HOVER: {
      if (state.itemsHover.locked) {
        return state
      }
      return {
        ...state,
        itemsHover: {
          itemId: action.args.itemId,
          indexRow: action.args.indexRow,
          indexCol: action.args.indexCol
        }
      }
    }
    case ActionRegistry.APP_ITEMS_SELECT: {
      if (action.args.itemId) {
        return {
          ...state,
          itemsHover: {
            locked: true,
            itemId: action.args.itemId,
            indexRow: action.args.indexRow,
            indexCol: action.args.indexCol
          }
        }
      }
      return {
        ...state,
        itemsHover: {
          ...state.itemsHover,
          locked: false
        }
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
