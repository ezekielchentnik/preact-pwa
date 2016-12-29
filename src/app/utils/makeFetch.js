/* global fetch */

export const clientDefaults = {
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export const checkStatus = (response) => {
  if (!response.ok) { // status in the range 200-299 or not
    return Promise.reject(new Error(response.statusText || 'Status not OK'))
  }
  return response
}

export const parseJSON = (response) => response.json()

const rootFetch = (url, options) => fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)

export const clientFetch = (url, options) => rootFetch(url, Object.assign({}, clientDefaults, options))

export default (url, options) => rootFetch(url, options)
