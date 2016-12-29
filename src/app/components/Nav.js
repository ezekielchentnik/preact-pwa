import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { connect } from 'preact-redux'
import { updateLocation } from './../store/actions/ActionCreators'

export const Link = ({ href, children, onClick, className }) => (
  <a href={href} className={className} onClick={(e) => {
    if (onClick) {
      onClick(e)
    }
    if (e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.defaultPrevented === true) {
      return
    }
    e.preventDefault()
  }} >{children}</a>
)

const Nav = ({ _updateLocation }) => (
  <nav className='Nav'>
    <div className='inner'>
      <Link href='/' onClick={(e) => _updateLocation('/')} className='logo'>NYT</Link>
      <Link href='/' onClick={(e) => _updateLocation('/')}>Top</Link>
      <Link href='/about' onClick={(e) => _updateLocation('/about')}>About</Link>
    </div>
  </nav>
)

export default connect(
  null,
  (dispatch) => ({
    _updateLocation: (url) => dispatch(updateLocation(url))
  })
)(Nav)
