// todo: optimize selectors
// import { createSelector } from 'reselect'
import { getId } from './meta'
export const getArticles = (state) => state.articles.collection
export const getArticle = (state) => { // todo: fix fugg it hack, make bullet proof
  const id = getId(state)
  if (!id) {
    return null
  }
  const articles = state.articles.collection.filter((article) => article.id.toString() === id.toString())
  return articles.length ? articles[0] : null
}
export const getHasFetchedArticles = (state) => state.articles.hasFetched
export const getShouldFetchArticles = (state) => state.articles.collection.length === 0 || state.articles.didInvalidate
