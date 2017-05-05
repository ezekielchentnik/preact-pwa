import { static as serveStatic } from 'express'

const setHeaders = (res) => {
  res.header('Cache-Control', 'max-age=31536000, immutable')
}

export default () => serveStatic('build/public', { setHeaders })
