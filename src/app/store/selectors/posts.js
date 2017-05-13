// import { createSelector } from 'reselect'
import { getId } from './meta'
export const getPosts = (state) => state.posts.collection
export const getPost = (state) => { // todo: fix fugg it hack, make bullet proof
  const id = getId(state)
  if (!id) {
    return null
  }
  const posts = state.posts.collection.filter((post) => post.id.toString() === id.toString())
  return posts.length ? posts[0] : null
}
export const getHasFetchedPosts = (state) => state.posts.hasFetched
export const getShouldFetchPosts = (state) => state.posts.collection.length === 0 || state.posts.didInvalidate
