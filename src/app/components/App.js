import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Provider, connect } from 'preact-redux' // introduces 2.9kb on gzipped bundle, todo: barf, fix
import { getUrl } from './../store/selectors/meta'
import Header from './Header'
import Articles from './Articles'
import Article from './Article'
import Splash from './Splash'
import FourOhFour from './FourOhFour'

const Content = connect(
  (state) => ({
    url: getUrl(state)
  })
)(({ url }) => { // todo: make routing more robust
  if (url.indexOf('/articles/') > -1) {
    return <Article />
  } else if (url === '/articles') {
    return <Articles />
  } else if (url === '/') {
    return <Splash />
  } else {
    return <FourOhFour />
  }
})

export default ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <Content />
    </div>
  </Provider>
)
