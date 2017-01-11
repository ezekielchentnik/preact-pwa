import { combineReducers } from 'redux'
import meta from './meta'
import articles from './articles'
import location from './location'
import menu from './menu'

export default combineReducers({
  meta,
  articles,
  location,
  menu
})
