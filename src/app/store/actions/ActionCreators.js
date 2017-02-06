import {
  FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_ERROR,
  UPDATE_LOCATION,
  OPEN_MENU, CLOSE_MENU
} from './ActionTypes'
import { getShouldFetchArticles, getArticles } from './../selectors/articles'
import { getCurrentUrl, getMenuIsOpen } from './../selectors/meta'

const TOPSTORIES_API_URL = 'https://jsonplaceholder.typicode.com/posts'

const startAction = (type) => ({ type })
const successAction = (type, json) => ({ type, payload: json, meta: { receivedAt: Date.now() } })
const errorAction = (type, error) => ({ type, payload: error, error: true, meta: { receivedAt: Date.now() } })

const fetchArticles = () => (dispatch, getState, fetchMethod) => {
  dispatch(startAction(FETCH_ARTICLES))
  return fetchMethod(TOPSTORIES_API_URL)
    .then((json) => dispatch(successAction(FETCH_ARTICLES_SUCCESS, json)))
    .catch((error) => dispatch(errorAction(FETCH_ARTICLES_ERROR, error)))
}

export const fetchArticlesIfNeeded = () => (dispatch, getState) => {
  const state = getState()
  return getShouldFetchArticles(state) ? dispatch(fetchArticles()) : Promise.resolve(getArticles(state))
}

export const fetchInitialState = () => (dispatch) => Promise.all([
  dispatch(fetchArticlesIfNeeded())
])

export const updateLocation = (newURL) => (dispatch, getState) => {
  if (newURL === getCurrentUrl(getState())) {
    return
  }
  dispatch({
    type: UPDATE_LOCATION,
    payload: {
      currentUrl: newURL
    } // todo: parse url
  })
}

export const openMenu = () => ({ type: OPEN_MENU })
export const closeMenu = () => ({ type: CLOSE_MENU })
export const toggleMenu = () => (dispatch, getState) => {
  return getMenuIsOpen(getState()) ? closeMenu() : openMenu()
}
