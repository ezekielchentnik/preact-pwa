import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Provider, connect } from 'preact-redux' // introduces 2.9kb on gzipped bundle, todo: barf, fix
import { getCurrentUrl } from './../store/selectors/meta'
import Header from './Header'
import Articles from './Articles'
import Article from './Article'
import Splash from './Splash'

const Page = connect(
  (state) => ({
    currentUrl: getCurrentUrl(state)
  })
)(({ currentUrl }) => { // todo: make routing more robust
  if (currentUrl.indexOf('/articles/') > -1) {
    return <Article currentUrl={currentUrl} />
  } else if (currentUrl === '/articles') {
    return <Articles />
  } else {
    return <Splash />
  }
})

export default ({ store, currentUrl }) => (
  <Provider store={store}>
    <div >
      <Header />
      <Page />
    </div>
  </Provider>
)
