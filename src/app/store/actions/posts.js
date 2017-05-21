import { getShouldFetchPosts, getPosts } from './../selectors/posts'

export const FETCH_POSTS = 'api/FETCH_POSTS'
export const FETCH_POSTS_SUCCESS = 'api/FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'api/FETCH_POSTS_ERROR'
export const INVALIDATE_FETCH_POSTS = 'api/INVALIDATE_FETCH_POSTS'

const checkStatus = (response) => {
  if (!response.ok) { // status in the range 200-299 or not
    return Promise.reject(new Error(response.statusText || 'Status not OK'))
  }
  return response
}

const parseJSON = (response) => response.json()

const startAction = (type) => ({ type })
const successAction = (type, json) => ({ type, payload: json })
const errorAction = (type, error) => ({ type, payload: error, error: true })

const fetchPosts = () => (dispatch, getState, fetchMethod) => {
  dispatch(startAction(FETCH_POSTS))
  return fetchMethod('https://jsonplaceholder.typicode.com/posts')
  .then(checkStatus)
  .then(parseJSON)
  .then((json) => dispatch(successAction(FETCH_POSTS_SUCCESS, json)))
  .catch((error) => dispatch(errorAction(FETCH_POSTS_ERROR, error)))
}

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
  const state = getState()
  return getShouldFetchPosts(state) ? dispatch(fetchPosts()) : Promise.resolve(getPosts(state))
}
