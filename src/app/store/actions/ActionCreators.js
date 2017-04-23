import {
  FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_ERROR,
  UPDATE_LOCATION
} from './ActionTypes'
import { getShouldFetchArticles, getArticles } from './../selectors/articles'
import { getUrl } from './../selectors/meta'

const TOPSTORIES_API_URL = 'https://jsonplaceholder.typicode.com/posts'

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

const fetchArticles = () => (dispatch, getState, fetchMethod) => {
  dispatch(startAction(FETCH_ARTICLES))
  return fetchMethod(TOPSTORIES_API_URL, { credentials: 'include' })
    .then(checkStatus)
    .then(parseJSON)
    .then((json) => dispatch(successAction(FETCH_ARTICLES_SUCCESS, json)))
    .catch((error) => dispatch(errorAction(FETCH_ARTICLES_ERROR, error)))
}

export const fetchArticlesIfNeeded = () => (dispatch, getState) => {
  const state = getState()
  return getShouldFetchArticles(state) ? dispatch(fetchArticles()) : Promise.resolve(getArticles(state))
}

export const fetchInitialState = () => (dispatch, getState) => Promise.all([
  dispatch(fetchArticlesIfNeeded())
])

export const updateLocation = (newUrl) => (dispatch, getState) => {
  if (newUrl === getUrl(getState())) {
    return
  }
  dispatch({
    type: UPDATE_LOCATION,
    payload: {
      url: newUrl
    } // todo: better parse url
  })
}
