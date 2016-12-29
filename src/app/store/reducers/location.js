import { UPDATE_LOCATION } from './../actions/ActionTypes'

export const initialState = {
  url: '/'
}

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}
