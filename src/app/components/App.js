import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Provider, connect } from 'preact-redux' // introduces 2.9kb on gzipped bundle, todo: barf, fix
import { getCurrentUrl } from './../store/selectors/meta'
import Header from './Header'
import Articles from './Articles'
import Article from './Article'
import About from './About'
import Splash from './Splash'

const Content = ({ currentUrl }) => { // todo: make routing better
  if (currentUrl.indexOf('/articles/') > -1) {
    return <Article id={currentUrl} />
  } else if (currentUrl === '/articles') {
    return <Articles />
  } else if (currentUrl === '/about') {
    return <About />
  } else {
    return <Splash />
  }
}

const App = ({ store, currentUrl }) => (
  <Provider store={store}>
    <div className='App'>
      <Header />
      <Content currentUrl={currentUrl} />
    </div>
  </Provider>
)

export default connect(
  (state) => ({
    currentUrl: getCurrentUrl(state)
  })
)(App)
