import { h } from 'preact' // eslint-disable-line no-unused-vars
import render from 'preact-render-to-string'
import createStore from './../../app/store/createStore'
import App from './../../app/components/App'
import { Router } from 'express'
import fetch from 'node-fetch'
import withTimeout from './../../app/utils/withTimeout'
import { readFileSync } from 'fs'
import { fetchPostsIfNeeded } from './../../app/store/actions/posts'
import { updateLocation } from './../../app/store/actions/meta'

const assets = JSON.parse(readFileSync(`${__dirname}/public/assets.json`))
const manifestUrl = `/${assets['manifest.json']}`
const inlineCss = readFileSync(`${__dirname}/public/${assets['bundle.css']}`)
const inlineJs = readFileSync(`${__dirname}/public/${assets['bundle.js']}`)
const AppShell = ({ html, state }) => `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <script>if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); }</script>
    <title>Preact PWA</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#673ab8">
    <link rel="manifest" href="${manifestUrl}">
    <link rel="dns-prefetch" href="https://jsonplaceholder.typicode.com">
    <link rel="shortcut icon"type="image/x-icon" href="data:image/x-icon;,">
    <style>${inlineCss}</style>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window.__STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script>
    <script>${inlineJs}</script>
  </body>
</html>`

const createPreloadedState = () => ({}) // stub

const createAppShell = (store) => {
  const state = store.getState()
  const html = render(<App store={store} />)
  return AppShell({ html, state })
}

export default Router().get('/', (req, res) => {
  const store = createStore(createPreloadedState(), fetch)
  store.dispatch(updateLocation(req.originalUrl))
  withTimeout(
    store.dispatch(fetchPostsIfNeeded()),
    100 // adjust for optimal threshold
  )
  .catch((err) => console.log(err))
  .then(() => res.send(createAppShell(store)))
  .catch((err) => console.log(err))
})
