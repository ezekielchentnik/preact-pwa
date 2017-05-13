import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import IS_CLIENT from '../utils/isClient'

// we pass fetch so that we can use global on window, node-fetch on server
export default (initialState, fetchMethod) => {
  const enhancer = compose(
      applyMiddleware(thunk.withExtraArgument(fetchMethod)),
      IS_CLIENT && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
  return createStore(rootReducer, initialState, enhancer)
}
