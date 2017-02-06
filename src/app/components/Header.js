import { h } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { updateLocation, openMenu, closeMenu } from './../store/actions/ActionCreators'
import { getMenuIsOpen } from './../store/selectors/meta'
import Link from './Link'

const Header = ({ _updateLocation, _openMenu, _closeMenu, menuIsOpen }) => (
  <header className='Header'>
    <input id='click' type='checkbox' checked={menuIsOpen ? 'checked' : null} />
    <div className='toolbar'>
      <div className='identity'>[logo]</div>
    </div>
    <label className='ic-menu' onClick={(e) => {
      _openMenu()
    }}>
      <div className='i' />
      <div className='i' />
      <div className='i' />
    </label>
    <nav className='Nav'>
      <Link className='item' href='/' onClick={(e) => {
        _updateLocation('/')
        _closeMenu()
      }}>Home</Link>
      <Link className='item' href='/articles' onClick={(e) => {
        _updateLocation('/articles')
        _closeMenu()
      }}>Articles</Link>
      <Link className='item' href='/about' onClick={(e) => {
        _updateLocation('/about')
        _closeMenu()
      }}>About</Link>
    </nav>
  </header>
)

export default connect(
  (state) => ({
    menuIsOpen: getMenuIsOpen(state)
  }),
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url)),
    _openMenu: () => dispatch(openMenu()),
    _closeMenu: () => dispatch(closeMenu())
  })
)(Header)
