import { h, render } from 'preact' // eslint-disable-line no-unused-vars
import App from './components/App'
import createStore from './store/createStore'
import { fetchInitialState, updateLocation } from './store/actions/ActionCreators'
import ensurePolyfills from './utils/ensurePolyfills'
import clientFetch from './utils/makeFetch'

const app = document.getElementById('app')
const store = createStore(window.__STATE__, clientFetch)

ensurePolyfills(() => {
  store.dispatch(fetchInitialState())
})

window.addEventListener('popstate', (e) => {
  store.dispatch(updateLocation(window.location.pathname + window.location.search))
})

store.subscribe(() => {
  const { location } = store.getState()
  window.history.pushState({}, '', location.url)
})
store.dispatch(updateLocation(window.location.pathname + window.location.search))

render(<App store={store} />, app, app.lastChild)
