import { static as serveStatic } from 'express'

export default () => serveStatic('build/public/sw.js')
