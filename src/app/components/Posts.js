import { h } from 'preact' // eslint-disable-line no-unused-vars
import PreactRedux from 'preact-redux'
import { getPosts } from './../store/selectors/posts'
import { updateLocation } from './../store/actions/ActionCreators'
import Link from './Link'
const { connect } = PreactRedux

const Post = ({ post, _updateLocation }) => (
  <li className='Post card'>
    <Link href={`/blog/${post.id}`} onClick={() => _updateLocation(`/blog/${post.id}`)}>
      {post.title}
    </Link>
  </li>
)

const Posts = ({ posts, _updateLocation }) => (
  <div className='page'>
    <ul className='Posts'>
      {posts.map((post, i) => (
        <Post _updateLocation={_updateLocation} post={post} key={i} />
      ))}
    </ul>
  </div>
)

export default connect(
  (state) => ({
    posts: getPosts(state)
  }),
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Posts)
