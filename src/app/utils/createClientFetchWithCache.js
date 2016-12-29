/* global sessionStorage */
import { clientFetch } from './makeFetch'
import hasStorage from './hasStorage'

const storeJSON = (key, json) => {
  if (json && !json.error && !json.errorMessage) {
    sessionStorage.setItem(key, JSON.stringify(json))
  }
  return json
}

const getNearestTimestamp = (interval) => { // we round down to nearest interval
  const coeff = 1000 * 60 * (interval || 5)
  let date = new Date()
  let rounded = new Date(Math.floor(date.getTime() / coeff) * coeff)
  return rounded.getTime()
}

export default ({ uuid }) => (url, options) => {
  if (hasStorage()) {
    const interval = 5 // use interval for cache key, expire every 5 mins
    const stamp = getNearestTimestamp(interval)
    const key = `${url}?_=${uuid}-${stamp}`
    const json = JSON.parse(sessionStorage.getItem(key))
    if (json) {
      return Promise.resolve(json)
    }
    return clientFetch(url, options)
      .then((json) => storeJSON(key, json))
  }
  return clientFetch(url, options)
}
