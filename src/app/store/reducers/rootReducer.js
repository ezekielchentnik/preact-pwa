import { combineReducers } from 'redux'
import meta from './meta'
import articles from './articles'

export default combineReducers({
  meta,
  articles
})
