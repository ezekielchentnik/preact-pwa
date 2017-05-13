import { combineReducers } from 'redux'
import meta from './meta'
import posts from './posts'

export default combineReducers({
  meta,
  posts
})
