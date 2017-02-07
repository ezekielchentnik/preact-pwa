import { h } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { getArticle } from './../store/selectors/articles'

const Loader = () => (
  <div>
    loading...
  </div>
)

const Article = ({ article }) => article ? (
  <div className='Article page'>
    <div className='card'>
      <h1>{article.title}</h1>
      <div className='body'>{article.body}</div>
    </div>
  </div>
) : <Loader />

export default connect(
  (state) => ({
    article: getArticle(state)
  })
)(Article)
