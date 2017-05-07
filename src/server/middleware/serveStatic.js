import { static as serveStatic } from 'express'

const setHeaders = (res, path) => {
  if (path.indexOf('sw.js') > -1) {
    res.setHeader('Cache-Control', 'public,max-age=1800,no-cache')
  } else {
    res.setHeader('Cache-Control', 'public,max-age=31536000,immutable')
  }
}

export default () => serveStatic('build/public', { setHeaders })
