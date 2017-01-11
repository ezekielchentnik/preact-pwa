import { h } from 'preact' // eslint-disable-line no-unused-vars
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
      <Link href='/' onClick={(e) => _updateLocation('/')}>Home</Link>
      <Link href='/landings' onClick={(e) => _updateLocation('/landings')}>Landings</Link>
      <Link href='/map' onClick={(e) => _updateLocation('/map')}>Map</Link>
      <Link href='/facts' onClick={(e) => _updateLocation('/facts')}>Facts</Link>
      <Link href='/about' onClick={(e) => _updateLocation('/about')}>About</Link>
    </nav>
  </header>
))
