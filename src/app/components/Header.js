import { h } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { updateLocation } from './../store/actions/ActionCreators'
import Link from './Link'

const Header = ({ _updateLocation }) => (
  <header className='Header'>
    <h1>
      <Link className='item' href='/' onClick={(e) => {
        _updateLocation('/')
      }}>Preact PWA</Link>
    </h1>
    <nav>
      <Link className='item' href='/' onClick={(e) => {
        _updateLocation('/')
      }}>Home</Link>
      <Link className='item' href='/articles' onClick={(e) => {
        _updateLocation('/articles')
      }}>Articles</Link>
      <Link className='item' href='/articles' onClick={(e) => {
        _updateLocation('/articles')
      }}>Articles</Link>
    </nav>
  </header>
)

export default connect(
  null,
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Header)
