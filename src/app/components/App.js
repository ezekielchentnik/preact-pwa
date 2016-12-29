import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { Provider, connect } from 'preact-redux' // introduces 2.9kb on gzipped bundle, todo: barf, fix
import Articles from './Articles'
import About from './About'
import Nav from './Nav'

const App = ({ store, location }) => (
  <Provider store={store}>
    <div className='App'>
      <Nav />
      {location.url === '/about' ? <About /> : <Articles />}
    </div>
  </Provider>
)

export default connect(
  (state) => ({
    location: state.location
  })
)(App)
