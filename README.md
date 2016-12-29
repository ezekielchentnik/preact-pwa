# [sfpwa](https://sfpwa-154005.appspot.com)

A `Super fast progressive web app` with a small footprint & minimal dependancies.  Features universal rendering, redux, state-driven routing, preact, & service workers.  Crunched & optimized with rollup, buble, optimize-js, & purify-css.  Consumes the [New York Times API](http://developer.nytimes.com/)

Live version: [https://sfpwa-154005.appspot.com](https://sfpwa-154005.appspot.com)

## bundle sizes

...

## Features

- Progressive Web App enabled with [service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- Universal JavaScript (isomorphic rendering)
- Modern JavaScript syntax with [ES6](https://github.com/lukehoban/es6features) via [buble](https://buble.surge.sh/guide/).
- Performant bundles via [rollup](http://rollupjs.org/).
- Component-based UI architecture via [Preact](https://preactjs.com/).
- Application state management w/time-travel debugging via [Redux](https://github.com/gaearon/redux).
- CSS built with [Sass](http://sass-lang.com/), [tachyons](http://tachyons.io/), and optimized with [purify-css](https://github.com/purifycss/purifycss).
- Async actions handled with [redux-thunk](https://github.com/gaearon/redux-thunk), [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch), and [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- Node server is built with [express](http://expressjs.com/).
- Linting is handled with [Standard](http://standardjs.com/).

## Getting Started

### Prerequisites

Make sure that [Node v7](https://nodejs.org/en/download/releases/) is installed.

Make sure that [yarn](https://github.com/yarnpkg/yarn) is installed.

### Instructions

First, clone the repo

```bash
$ git clone https://github.com/ezekielchentnik/sfpwa
```

Then, install all dependencies:

```bash
$ yarn
```

Finally, to run the project for development:

```bash
$ yarn dev
```

Or, to run the project for production:

```bash
$ yarn start
```

MIT Licensed
