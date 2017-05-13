import {
  FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,
  UPDATE_LOCATION
} from './ActionTypes'
import { getShouldFetchPosts, getPosts } from './../selectors/posts'
import { getUrl } from './../selectors/meta'

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts'

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
  return fetchMethod(POSTS_API_URL)
  .then(checkStatus)
  .then(parseJSON)
  .then((json) => dispatch(successAction(FETCH_POSTS_SUCCESS, json)))
  .catch((error) => dispatch(errorAction(FETCH_POSTS_ERROR, error)))
}

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
  const state = getState()
  return getShouldFetchPosts(state) ? dispatch(fetchPosts()) : Promise.resolve(getPosts(state))
}

export const fetchInitialState = () => (dispatch, getState) => Promise.all([
  dispatch(fetchPostsIfNeeded())
])

export const updateLocation = (newUrl) => (dispatch, getState) => {
  if (newUrl === getUrl(getState())) {
    return
  }
  dispatch({
    type: UPDATE_LOCATION,
    payload: {
      url: newUrl
    }
  })
}
