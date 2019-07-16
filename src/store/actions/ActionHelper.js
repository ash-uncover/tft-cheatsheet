import HelperRegistry from 'core/HelperRegistry'
import ActionRegistry from 'core/ActionRegistry'
import ServiceRegistry from 'core/ServiceRegistry'

import PromiseUtils from 'utils/PromiseUtils'

export class ActionHelper {
  loadData (dispatch) {
    dispatch(ActionRegistry.loadDataRequest())
    return Promise.all([
      ServiceRegistry.DATA.service.items.get(),
      ServiceRegistry.DATA.service.champions.get(),
      ServiceRegistry.DATA.service.origins.get(),
      ServiceRegistry.DATA.service.classes.get(),
      ServiceRegistry.DATA.service.bonuses.get(),
      PromiseUtils.alwaysResolve(null, 750)
    ])
      .then(responses => {
        const result = {
          items: responses[0].items,
          champions: responses[1].champions,
          origins: responses[2].origins,
          classes: responses[3].classes,
          bonuses: responses[4].bonus
        }
        dispatch(ActionRegistry.loadDataSuccess(result))
      })
      .catch(error => {
        dispatch(ActionRegistry.loadDataFailure(error))
      })
  }
}

const Helper = new ActionHelper()

HelperRegistry.register(Helper, 'Action')

export default Helper
