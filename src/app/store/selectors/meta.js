// todo: optimize selectors
// import { createSelector } from 'reselect'
export const getUuid = (state) => state.meta.uuid
export const getMenuIsOpen = (state) => state.meta.menuIsOpen
export const getCurrentUrl = (state) => state.meta.currentUrl
