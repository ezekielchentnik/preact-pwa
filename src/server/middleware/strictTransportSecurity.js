export default () => (req, res, next) => {
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  next()
}
