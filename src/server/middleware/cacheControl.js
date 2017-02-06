export default () => (req, res, next) => {
  res.header('Cache-Control', 'public, max-age=31536000, no-cache') // lucid
  // res.header('Cache-Control', 'no-cache, no-store, must-revalidate') // never
  next()
}
