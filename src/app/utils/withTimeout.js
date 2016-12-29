export default (promises, timeout) => Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Promises not resolved after ' + timeout + ' ms'))
    }, timeout)
  })
].concat(promises))
