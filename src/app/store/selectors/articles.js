// todo: optimize selectors
// import { createSelector } from 'reselect'
export const getArticles = (state) => state.articles.collection
export const getArticle = (state) => { // todo: fix fugg it hack, make bullet proof
  const id = state.meta.currentUrl.split('/articles/')[1]
  const articles = state.articles.collection.filter((article) => article.id.toString() === id)
  return articles.length ? articles[0] : null
}
export const getHasFetchedArticles = (state) => state.articles.hasFetched
export const getShouldFetchArticles = (state) => state.articles.collection.length === 0 || state.articles.didInvalidate
