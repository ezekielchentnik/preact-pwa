import { h } from 'preact' // eslint-disable-line no-unused-vars

export default () => (
  <div className='Splash page'>
    <div className='card'>
      <h2>Welcome</h2>
      <p><em>A `Super fast progressive web app` with a small footprint & minimal dependencies.</em></p>
      <p>available at <a href='https://github.com/ezekielchentnik/preact-pwa'>github.com/ezekielchentnik/preact-pwa</a></p>
    </div>
    <div className='card'>
      <h2>Features</h2>
      <ul>
        <li>Progressive Web App enabled with <a href='https://developers.google.com/web/fundamentals/getting-started/primers/service-workers'>service workers</a></li>
        <li>Offline capable with <a href='https://developers.google.com/web/fundamentals/getting-started/primers/service-workers'>service workers</a></li>
        <li>Mobile friendly with manifest.json</li>
        <li>Universal JavaScript (isomorphic rendering)</li>
        <li>Asset Versioning, long term caching, and cache busting for browser that do not support service workers via <a href='https://www.npmjs.com/package/node-rev'>node-rev </a></li>
        <li>Modern JavaScript syntax with <a href='https://github.com/lukehoban/es6features via buble https://buble.surge.sh/guide/'>ES6 </a>.</li>
        <li>Performant bundles via <a href='http://rollupjs.org/'>rollup</a>.</li>
        <li>Component-based UI architecture via <a href='https://preactjs.com/'>Preact</a>.</li>
        <li>Application state management w/time-travel debugging via <a href='https://github.com/gaearon/redux'>Redux</a>.</li>
        <li>CSS built with <a href='http://sass-lang.com/'>Sass</a> and optimized with <a href='https://github.com/purifycss/purifycss'>purify-css </a>.</li>
        <li>Async actions handled with <a href='https://github.com/gaearon/redux-thunk'>redux-thunk</a>, <a href='https://github.com/matthew-andrews/isomorphic-fetch'>fetch</a>.</li>
        <li>Node server is built with <a href='http://expressjs.com/'>express</a>.</li>
        <li>Linting is handled with <a href='http://standardjs.com/'>Standard</a>.</li>
      </ul>
    </div>
  </div>
)
