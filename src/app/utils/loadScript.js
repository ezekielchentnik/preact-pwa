export default (url, callback = () => {}) => {
  const script = document.createElement('script')
  script.onload = callback
  script.async = true
  document.getElementsByTagName('head')[0].appendChild(script)
  script.src = url
  return script
}
