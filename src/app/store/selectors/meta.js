// todo: optimize selectors
// import { createSelector } from 'reselect'
export const getUrl = (state) => state.meta.url
export const getPathname = (state) => state.meta.url.split('?')[0]
export const getId = (state) => {
  const url = getUrl(state)
  return url.indexOf('/blog/') > -1 ? url.split('/blog/')[1] : null
}
