import { UPDATE_LOCATION, OPEN_MENU, CLOSE_MENU } from './../actions/ActionTypes'

export const initialState = {
  title: 'Articles',
  uuid: 'no_user',
  currentUrl: '/',
  menuIsOpen: false
}

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, payload)
    case OPEN_MENU:
      return Object.assign({}, state, { menuIsOpen: true })
    case CLOSE_MENU:
      return Object.assign({}, state, { menuIsOpen: false })
    default:
      return state
  }
}
