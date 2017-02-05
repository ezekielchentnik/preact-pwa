import { h } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { toggleMenu, updateLocation } from './../store/actions/ActionCreators'
import { getMenuIsExpanded } from './../store/selectors/meta'
import Link from './Link'

const Header = ({ _toggleMenu, _updateLocation, menuIsExpanded }) => (
  <header className='Header'>
    <input id='click' type='checkbox' checked={menuIsExpanded ? 'checked' : null} />
    <div className='toolbar'>
      <div className='identity'>[logo]</div>
    </div>
    <label className='ic-menu' onClick={(e) => {
      _toggleMenu()
    }}>
      <div className='i' />
      <div className='i' />
      <div className='i' />
    </label>
    <nav className='Nav'>
      <Link className='item' href='/' onClick={(e) => {
        _updateLocation('/')
        _toggleMenu()
      }}>Home</Link>
      <Link className='item' href='/landings' onClick={(e) => {
        _updateLocation('/landings')
        _toggleMenu()
      }}>Landings</Link>
      <Link className='item' href='/about' onClick={(e) => {
        _updateLocation('/about')
        _toggleMenu()
      }}>About</Link>
    </nav>
  </header>
)

export default connect(
  (state) => ({
    menuIsExpanded: getMenuIsExpanded(state)
  }),
  (dispatch) => ({
    _toggleMenu: () => dispatch(toggleMenu()),
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Header)
