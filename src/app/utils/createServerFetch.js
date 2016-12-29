import makeFetch from './makeFetch'
export default (defaults = {}) => (url, options) => {
  return makeFetch(url, Object.assign({}, defaults, options))
}
