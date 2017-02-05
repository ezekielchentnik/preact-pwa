import { UPDATE_LOCATION, TOGGLE_MENU } from './../actions/ActionTypes'

export const initialState = {
  title: 'Meteors',
  uuid: 'no_user',
  currentUrl: '/',
  menuIsExpanded: false
}

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, payload)
    case TOGGLE_MENU:
      return Object.assign({}, state, { isExpanded: !state.isExpanded })
    default:
      return state
  }
}
