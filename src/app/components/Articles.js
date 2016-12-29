import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { getArticles } from './../store/selectors/articles'

const Article = ({ article }) => (
  <li className='Article' >
    <a href={article.url} target='_blank'>
      {article.title}
    </a>
  </li>
)

const Articles = ({ articles }) => (
  <ul className='content Articles'>
    {articles.map((article, i) => (
      <Article article={article} key={i} />
    ))}
  </ul>
)

export default connect(
  (state) => ({
    articles: getArticles(state)
  })
)(Articles)
