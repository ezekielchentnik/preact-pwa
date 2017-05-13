import { h } from 'preact' // eslint-disable-line no-unused-vars
import PreactRedux from 'preact-redux'
import { getPost } from './../store/selectors/posts'
import { getId } from './../store/selectors/meta'
const { connect } = PreactRedux

const Loader = () => (
  <div className='Loader page'>
    <div className='card'>
      Loading
    </div>
  </div>
)

const Post = ({ post, id }) => post ? (
  <div id={id} className='Post page'>
    <div className='card'>
      <h1>{post.title}</h1>
      <div className='body'>{post.body}</div>
    </div>
  </div>
) : <Loader />

export default connect(
  (state) => ({
    post: getPost(state),
    id: getId(state)
  })
)(Post)
