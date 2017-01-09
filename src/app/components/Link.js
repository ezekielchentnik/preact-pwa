import { h } from 'preact' // eslint-disable-line no-unused-vars

export default ({ href, children, onClick, className }) => (
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
