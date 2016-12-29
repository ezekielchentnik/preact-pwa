import { FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_ERROR } from './../actions/ActionTypes'

export const initialState = {
  lastUpdated: null,
  isFetching: false,
  hasFetched: false,
  hasError: false,
  error: null,
  items: []
}

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_ARTICLES_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        hasFetched: true,
        isFetching: false,
        lastUpdated: meta.receivedAt
      })
    case FETCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        items: payload.results,
        hasFetched: true,
        isFetching: false,
        lastUpdated: meta.receivedAt
      })
    default:
      return state
  }
}
