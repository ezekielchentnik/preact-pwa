import { h } from 'preact' // eslint-disable-line no-unused-vars
import PreactRedux from 'preact-redux'
import { updateLocation } from './../store/actions/meta'
import Link from './Link'
const { connect } = PreactRedux

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
      <Link className='item' href='/blog' onClick={(e) => {
        _updateLocation('/blog')
      }}>Blog</Link>
      <Link className='item' href='/about' onClick={(e) => {
        _updateLocation('/about')
      }}>About</Link>
    </nav>
  </header>
)

export default connect(
  null,
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Header)
