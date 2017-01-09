export default () => (req, res, next) => {
  res.header('Cache-Control', 'no-cache')
  next()
}
