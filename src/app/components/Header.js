import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { updateLocation } from './../store/actions/ActionCreators'
import Link from './Link'

export default connect(
  null,
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(({ _updateLocation }) => (
  <header className='Header'>
    <nav className='Nav'>
      <Link href='/' onClick={(e) => _updateLocation('/')} className='logo'>Home</Link>
      <Link href='/' onClick={(e) => _updateLocation('/')}>Top</Link>
      <Link href='/about' onClick={(e) => _updateLocation('/about')}>About</Link>
    </nav>
  </header>
))
