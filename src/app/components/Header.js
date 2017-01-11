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
    <input id="click" type="checkbox"/>
    <div className="toolbar"></div>
    <label className="ic-menu" for="click">
      <div className="i"></div>
      <div className="i"></div>
      <div className="i"></div>
    </label>
    <nav className='Nav'>
      <Link className='item' href='/' onClick={(e) => _updateLocation('/')}>Home</Link>
      <Link className='item' href='/landings' onClick={(e) => _updateLocation('/landings')}>Landings</Link>
      <Link className='item' href='/about' onClick={(e) => _updateLocation('/about')}>About</Link>
    </nav>
  </header>
))
