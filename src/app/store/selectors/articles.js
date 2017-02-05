// import { createSelector } from 'reselect'
export const getArticles = (state) => state.articles.collection
export const getHasFetchedArticles = (state) => state.articles.hasFetched
export const getShouldFetchArticles = (state) => state.articles.collection.length === 0 || state.articles.didInvalidate
