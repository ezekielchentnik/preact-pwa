import { h } from 'preact' // eslint-disable-line no-unused-vars
import PreactRedux from 'preact-redux'
import { getArticle } from './../store/selectors/articles'
import { getId } from './../store/selectors/meta'
const { connect } = PreactRedux

const Loader = () => (
  <div className='Loader page'>
    <div className='card'>
      Loading
    </div>
  </div>
)

const Article = ({ article, id }) => article ? (
  <div id={id} className='Article page'>
    <div className='card'>
      <h1>{article.title}</h1>
      <div className='body'>{article.body}</div>
    </div>
  </div>
) : <Loader />

export default connect(
  (state) => ({
    article: getArticle(state),
    id: getId(state)
  })
)(Article)
