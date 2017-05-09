import { h } from 'preact' // eslint-disable-line no-unused-vars
import PreactRedux from 'preact-redux'
import { getArticles } from './../store/selectors/articles'
import { updateLocation } from './../store/actions/ActionCreators'
import Link from './Link'
const { connect } = PreactRedux

const Article = ({ article, _updateLocation }) => (
  <li className='Article card'>
    <Link href={`/articles/${article.id}`} onClick={(e) => _updateLocation(`/articles/${article.id}`)}>
      {article.title}
    </Link>
  </li>
)

const Articles = ({ articles, _updateLocation }) => (
  <div className='page'>
    <ul className='Articles'>
      {articles.map((article, i) => (
        <Article _updateLocation={_updateLocation} article={article} key={i} />
      ))}
    </ul>
  </div>
)

export default connect(
  (state) => ({
    articles: getArticles(state)
  }),
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Articles)
