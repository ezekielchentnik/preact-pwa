import { h, render } from 'preact' // eslint-disable-line no-unused-vars
import App from './components/App'
import createStore from './store/createStore'
import { fetchInitialState, updateLocation } from './store/actions/ActionCreators'
import { getCurrentUrl } from './store/selectors/meta'
import ensurePolyfills from './utils/ensurePolyfills'
import clientFetch from './utils/makeFetch'

const app = document.getElementById('app')
const store = createStore(window.__STATE__, clientFetch)

ensurePolyfills(() => { // assumes no pollys in components
  // store.dispatch(fetchInitialState())
})

window.addEventListener('popstate', (e) => {
  store.dispatch(updateLocation(window.location.pathname + window.location.search))
})

store.subscribe(() => {
  const currentUrl = getCurrentUrl(store.getState())
  if (window.location.pathname + window.location.search !== currentUrl) {
    window.history.pushState({}, '', currentUrl)
  }
})
store.dispatch(updateLocation(window.location.pathname + window.location.search))

render(<App store={store} />, app, app.lastChild)
