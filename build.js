const fs = require('fs')
const rollup = require('rollup').rollup
const sass = require('node-sass')
const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const multiEntry = require('rollup-plugin-multi-entry')
const cssnano = require('cssnano')
const purifycss = require('purify-css')
const optimizeJs = require('optimize-js')
const pkg = require('./package')
const external = Object.keys(pkg.dependencies).concat(['fs', 'path'])
const uglifyOptions = {
  compress: {
    warnings: false,
    screw_ie8: true,
    sequences: true,
    dead_code: true,
    drop_debugger: true,
    comparisons: true,
    conditionals: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: true,
    hoist_funs: true,
    if_return: true,
    join_vars: true,
    cascade: true,
    drop_console: false // todo: toggle
  },
  output: {
    comments: false
  }
}

const polyfills = () => rollup({
  context: 'window',
  plugins: [
    uglify()
  ],
  entry: 'src/app/utils/polyfills.min.js'
})
.then((bundle) => bundle.write({ format: 'iife', dest: `build/public/polyfills.min.js` }))

const css = () => new Promise((resolve, reject) => {
  let outFile = `build/public/bundle-${pkg.version}.css`
  let file = `src/app/styles/entry.scss`
  sass.render({ file, outFile }, (error, result) => {
    if (error) {
      reject(error)
    } else {
      const pure = purifycss(['src/app/components/**/*.js'], result.css.toString(), { info: false, rejected: false })
      cssnano.process(pure, { autoprefixer: { add: true } }).then((result) => resolve(fs.writeFile(outFile, result.css)))
    }
  })
})

const server = () => rollup({
  external,
  plugins: [
    replace({'__CLIENT__': false}),
    json(),
    commonjs({ extensions: [ '.js', '.json' ] }),
    buble({ target: { node: 6 }, jsx: 'h' })
  ],
  entry: 'src/server/server.js'
}).then((bundle) => bundle.write({ sourceMap: true, format: 'cjs', dest: `build/server.js` }))

const sw = () => rollup({
  plugins: [
    commonjs(),
    buble(),
    replace({ '__VERSION__': pkg.version }),
    uglify(uglifyOptions)
  ],
  entry: 'src/app/sw.js'
}).then((bundle) => bundle.write({ format: 'iife', dest: `build/public/sw.js` }))

const client = () => rollup({
  context: 'window',
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    commonjs({ include: ['node_modules/**'], namedExports: { 'preact-redux': ['connect', 'Provider'] } }),
    replace({ '__CLIENT__': true, 'process.env.NODE_ENV': JSON.stringify('production') }),
    buble({ target: { chrome: 52, firefox: 48, safari: 9, edge: 13, ie: 11 }, jsx: 'h' }),
    uglify(uglifyOptions)
  ],
  entry: 'src/app/entry.js'
}).then((bundle) => {
  const result = bundle.generate({ sourceMap: true, format: 'iife' })
  const outFile = `build/public/bundle-${pkg.version}.js`
  fs.writeFileSync(outFile, optimizeJs(result.code) + `//# sourceMappingURL=bundle-${pkg.version}.js.map`)
  fs.writeFileSync(outFile + '.map', result.map.toString())
})

const test = () => rollup({ external, plugins: [buble({ jsx: 'h' }), multiEntry()], entry: 'test/**/*.js' })
  .then((bundle) => bundle.write({ sourceMap: true, format: 'cjs', dest: `build/test.js` }))

const tasks = new Map()
const run = (task) => {
  const start = new Date()
  return Promise.all([].concat(tasks.get(task)())).then(() => {
    console.log(`[build] '${task}' done in ${new Date().getTime() - start.getTime()}ms`)
  }, (err) => console.error(err.stack))
}

tasks.set('test', () => test())
tasks.set('client', () => [sw(), client(), polyfills(), css()])
tasks.set('server', () => server())
tasks.set('build', () => [run('client'), run('server')])

run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'build')
