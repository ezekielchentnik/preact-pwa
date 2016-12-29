import 'isomorphic-fetch'
import express from 'express'
import compression from 'compression'
import health from './routes/health'
import root from './routes/root'
const app = express()

app.use(compression())
// app.use(join(basePath, 'sw.js'), express.static('build/public/sw.js', { maxAge: '0d' }))
app.use('/public', express.static('build/public', { maxAge: '365d' }))
app.use('/health', health)
app.use(['/about', '/'], root)

export default app
