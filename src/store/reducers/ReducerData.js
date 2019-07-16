import ActionRegistry from 'core/ActionRegistry'

export const getDefaultState = () => ({
  loaded: false,
  loading: false,
  loadingError: null,
  items: [],
  champions: [],
  origins: [],
  classes: [],
  bonuses: []
})

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case ActionRegistry.LOAD_DATA_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
        loadingError: null
      }
    case ActionRegistry.LOAD_DATA_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        loadingError: null,
        items: action.args.data.items,
        champions: action.args.data.champions,
        origins: action.args.data.origins,
        classes: action.args.data.classes,
        bonuses: action.args.data.bonuses
      }
    case ActionRegistry.LOAD_DATA_FAILURE:
      return {
        ...getDefaultState(),
        loadingError: action.args.error
      }
    default: {
      return state
    }
  }
}

export default reducer
