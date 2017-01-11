require('source-map-support').install()
import 'isomorphic-fetch'
import app from './app'

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`[server] app on http://localhost:${server.address().port} - ${app.settings.env}`)
})

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0)
  })
})
