import * as types from './mutation-types'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  const type = mutation.type
  if (type.includes(types.BOARDS_ADD_ITEM) || type.includes(types.BOARDS_DEL_ITEM) ||
   type.includes(types.BOARDS_CREATE_BOARD) || type.includes(types.BOARDS_DELETE_BOARD) ) { // check if this mutation is wishlist related
    cacheStorage.setItem('current-boards', state.boards.items).catch((reason) => {
      Logger.error(reason, 'Boards') // it doesn't work on SSR
    })
  }
}
