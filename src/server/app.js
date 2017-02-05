import express from 'express'
import compression from 'compression'
import { cacheControl } from './middleware'
import { root, health } from './routes'

// likely our proxy will handle compression, cache-control, etc. these are healthy defaults
const app = express()
app.use(compression())
app.use('/public', express.static('build/public', { maxAge: '365d' }))
app.use('/health', health)
app.use(cacheControl())
app.use('/sw.js', express.static('build/public/sw.js'))
app.use('*', root)

export default app
