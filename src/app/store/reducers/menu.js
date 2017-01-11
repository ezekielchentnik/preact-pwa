import { TOGGLE_MENU } from './../actions/ActionTypes'

export const initialState = {
  isExpanded: false
}

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, { isExpanded: state.isExpanded ? false : true })
    default:
      return state
  }
}
