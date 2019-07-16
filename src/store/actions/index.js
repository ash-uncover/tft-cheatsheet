import 'store/actions/ActionHelper'

import ActionRegistry from 'core/ActionRegistry'

ActionRegistry.register('LOAD_DATA_REQUEST')
ActionRegistry.register('LOAD_DATA_SUCCESS', ['data'])
ActionRegistry.register('LOAD_DATA_FAILURE', ['error'])

ActionRegistry.register('APP_ITEMS_HOVER', ['itemId', 'indexRow', 'indexCol'])
ActionRegistry.register('APP_ITEMS_SELECT', ['itemId', 'indexRow', 'indexCol'])
