import express from 'express'
import shrinkRay from 'shrink-ray'
import { serveStatic, cacheControl, strictTransportSecurity } from './middleware'
import { root } from './routes'

// likely our proxy will handle compression, cache-control, etc. these are healthy defaults
const app = express()
app.disable('x-powered-by')
app.use(shrinkRay())
app.use(strictTransportSecurity())
app.use(serveStatic()) // immutable static content
app.use(cacheControl()) // cache control for the rest
app.use('/*', root) // everything else

export default app
