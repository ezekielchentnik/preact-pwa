import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, INVALIDATE_FETCH_POSTS } from './../actions/posts'

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
    case FETCH_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: true,
        hasFetched: false,
        hasError: false,
        error: null
      })
    case FETCH_POSTS_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: payload,
        hasFetched: true,
        isFetching: false,
        didInvalidate: true
      })
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        collection: payload,
        hasFetched: true,
        isFetching: false,
        didInvalidate: false
      })
    case INVALIDATE_FETCH_POSTS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}
