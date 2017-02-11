/* global fetch */

export const checkStatus = (response) => {
  if (!response.ok) { // status in the range 200-299 or not
    return Promise.reject(new Error(response.statusText || 'Status not OK'))
  }
  return response
}

export const parseJSON = (response) => response.json()

export default (url, options) => fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
