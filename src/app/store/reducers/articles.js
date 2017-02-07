import { FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_ERROR, INVALIDATE_FETCH_ARTICLES } from './../actions/ActionTypes'

export const initialState = {
  didInvalidate: false,
  isFetching: false,
  hasFetched: false,
  hasError: false,
  error: null,
  collection: [] // do not mutate these
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
        didInvalidate: true
      })
    case FETCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        collection: payload,
        hasFetched: true,
        isFetching: false,
        didInvalidate: false
      })
    case INVALIDATE_FETCH_ARTICLES:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}
