import { h } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { getArticles } from './../store/selectors/articles'
import { updateLocation } from './../store/actions/ActionCreators'
import Link from './Link'

const Landing = ({ article, _updateLocation }) => (
  <li className='Article' >
    <Link href={`/landings/${article.id}`} onClick={(e) => _updateLocation(`/landings/${article.id}`)}>
      {article.name}
    </Link>
  </li>
)

const Landings = ({ articles, _updateLocation }) => (
  <ul className='Articles'>
    {articles.map((article, i) => (
      <Landing _updateLocation={_updateLocation} article={article} key={i} />
    ))}
  </ul>
)

export default connect(
  (state) => ({
    articles: getArticles(state)
  }),
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Landings)
