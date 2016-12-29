import { combineReducers } from 'redux'
import meta from './meta'
import articles from './articles'
import location from './location'

export default combineReducers({
  meta,
  articles,
  location
})
