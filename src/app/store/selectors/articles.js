export const getArticles = (state) => state.articles.items
export const getHasFetchedArticles = (state) => state.articles.hasFetched
export const getShouldFetchArticles = (state) => !state.articles.hasFetched
