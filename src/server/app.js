import express from 'express'
import shrinkRay from 'shrink-ray'
import { cacheControl, strictTransportSecurity } from './middleware'
import { root } from './routes'

// likely our proxy will handle compression, cache-control, etc. these are healthy defaults
const app = express()
app.disable('x-powered-by')
app.use(shrinkRay())
app.use(strictTransportSecurity())
app.use('/public', express.static('build/public', { maxAge: '365d' }))
app.use(cacheControl())
app.use('/sw.js', express.static('build/public/sw.js'))
app.use('/manifest.json', express.static('build/public/manifest.json'))
app.use('*', root)

export default app
