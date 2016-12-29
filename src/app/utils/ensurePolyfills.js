import loadScript from './loadScript'

export default (callback) => {
  const isGoodBrowser = (
    'fetch' in window &&
    'Promise' in window &&
    'assign' in Object &&
    'keys' in Object
  )
  if (!isGoodBrowser) {
    loadScript('/public/polyfills.min.js', callback)
  } else {
    callback()
  }
}
