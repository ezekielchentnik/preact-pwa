// todo: optimize selectors
// import { createSelector } from 'reselect'
export const getUuid = (state) => state.meta.uuid
export const getMenuIsOpen = (state) => state.meta.menuIsOpen
export const getUrl = (state) => state.meta.url
export const getPathname = (state) => state.meta.url.split('?')[0]
export const getId = (state) => {
  const url = getUrl(state)
  return url.indexOf('/articles/') > -1 ? url.split('/articles/')[1] : null
}
