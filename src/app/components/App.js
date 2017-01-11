import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Provider, connect } from 'preact-redux' // introduces 2.9kb on gzipped bundle, todo: barf, fix
import Header from './Header'
import Landings from './Landings'
import About from './About'
import Landing from './Landing'
import Splash from './Splash'

const Content = ({ location }) => { // todo: make routing better
  if(location.url.indexOf('/landings/') > -1){
    return <Landing id={location.url} />
  } else if(location.url === '/landings'){
    return <Landings />
  } else if(location.url === '/about'){
    return <About />
  } else {
    return <Splash />
  }
}

const App = ({ store, location }) => (
  <Provider store={store}>
    <div className='App'>
      <Header />
      <Content location={location} />
    </div>
  </Provider>
)

export default connect(
  (state) => ({
    location: state.location
  })
)(App)
