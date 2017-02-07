import { h } from 'preact' // eslint-disable-line no-unused-vars
import render from 'preact-render-to-string'
import createStore from './../../app/store/createStore'
import App from './../../app/components/App'
import { Router } from 'express'
import createServerFetch from './../../app/utils/createServerFetch'
import withTimeout from './../../app/utils/withTimeout'
import { readFileSync } from 'fs'
import { fetchInitialState, updateLocation } from './../../app/store/actions/ActionCreators'
import assets from './../../../build/assets'

const jsUrl = `/public/${assets['bundle.js']}`
const inlineCss = readFileSync(`./build/public/${assets['bundle.css']}`)
// const inlineJs = readFileSync(`./build/public/${assets['bundle.js']}`)
const AppShell = ({ html, state }) => `<!DOCTYPE html>
<html>
  <head>
    <script>if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); }</script>
    <title>${state.meta.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="/public/manifest.json">
    <link rel="dns-prefetch" href="https://jsonplaceholder.typicode.com">
    <link rel="preload" as=script href="${jsUrl}">
    <link rel="shortcut icon"type="image/x-icon" href="data:image/x-icon;,">
    <style>${inlineCss}</style>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window.__STATE__=${JSON.stringify(state)}</script>
    <script async src="${jsUrl}"></script>
  </body>
</html>`

const createPreloadedState = () => ({}) // stub

const createAppShell = (store) => {
  const state = store.getState()
  const html = render(<App store={store} />)
  return AppShell({ html, state })
}

export default Router().get('/', (req, res) => {
  const store = createStore(createPreloadedState(), createServerFetch())
  store.dispatch(updateLocation(req.originalUrl)) // todo: sanitize
  withTimeout(
    store.dispatch(fetchInitialState()),
    50 // adjust for optimal threshold, ideally our services should be super fast
  )
  .catch((err) => console.log(err))
  .then(() => res.send(createAppShell(store)))
})
