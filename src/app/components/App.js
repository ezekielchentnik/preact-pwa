import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Provider, connect } from 'preact-redux' // introduces 2.9kb on gzipped bundle, todo: barf, fix
import { getCurrentUrl } from './../store/selectors/meta'
import Header from './Header'
import Landings from './Landings'
import About from './About'
import Landing from './Landing'
import Splash from './Splash'

const Content = ({ currentUrl }) => { // todo: make routing better
  if (currentUrl.indexOf('/landings/') > -1) {
    return <Landing id={currentUrl} />
  } else if (currentUrl === '/landings') {
    return <Landings />
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
