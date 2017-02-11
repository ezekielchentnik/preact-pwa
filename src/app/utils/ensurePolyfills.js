import loadScript from './loadScript'

export default (callback) => {
  const isGoodBrowser = (
    'fetch' in window &&
    'Promise' in window &&
    'assign' in Object
  )
  if (isGoodBrowser) {
    callback()
  } else {
    loadScript('/public/polyfills.min.js', callback)
  }
}
