const fs = require('fs')
const rollup = require('rollup').rollup
const sass = require('node-sass')
const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const url = require('rollup-plugin-url')
const multiEntry = require('rollup-plugin-multi-entry')
const cssnano = require('cssnano')
const purifycss = require('purify-css')
const optimizeJs = require('optimize-js')
const pkg = require('./package')
const swPrecache = require('sw-precache')
const external = Object.keys(pkg.dependencies).concat(['fs', 'path'])
const images = url({ limit: 1, publicPath: `/public/` })
const uglifyOptions = {
  compress: {
    unsafe_comps: true,
    properties: true,
    keep_fargs: false,
    pure_getters: true,
    collapse_vars: true,
    unsafe: true,
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
    drop_console: true
  },
  output: {
    comments: false
  }
}

const server = () => rollup({
  external,
  plugins: [
    replace({'__CLIENT__': false}),
    json(),
    images,
    commonjs({ extensions: [ '.js', '.json' ] }),
    buble({ jsx: 'h' })
  ],
  entry: 'src/server/server.js'
}).then((bundle) => bundle.write({ sourceMap: true, format: 'cjs', dest: `build/server.js` }))
.then(() => images.write({ dest: 'build/public/xyz.js' }))

const client = () => rollup({
  context: 'window',
  plugins: [
    nodeResolve({ jsnext: true, browser: true }),
    commonjs({ include: ['node_modules/**'], namedExports: { 'preact-redux': ['connect', 'Provider'] } }),
    replace({ '__CLIENT__': true, 'process.env.NODE_ENV': JSON.stringify('production') }),
    images,
    buble({ jsx: 'h' }),
    uglify(uglifyOptions)
  ],
  entry: 'src/app/entry.js'
}).then((bundle) => {
  const result = bundle.generate({ sourceMap: true, format: 'iife' })
  const outFile = `build/public/bundle-${pkg.version}.js`
  fs.writeFileSync(outFile, optimizeJs(result.code) + `//# sourceMappingURL=/public/bundle-${pkg.version}.js.map`)
  fs.writeFileSync(outFile + '.map', result.map.toString())
})

const css = () => new Promise((resolve, reject) => {
  sass.render({ file: `src/app/styles/entry.scss` }, (error, { css }) => {
    if (error) {
      reject(error)
    } else {
      cssnano
      .process(purifycss(['src/app/components/**/*.js'], css.toString()), { autoprefixer: { add: true } })
      .then(({ css }) => resolve(fs.writeFile(`build/public/bundle-${pkg.version}.css`, css)))
    }
  })
})

const sw = () => swPrecache.write('build/public/sw.js', {
  cacheId: pkg.name,
  staticFileGlobs: ['./build/public/bundle-*.{js,css}', './build/public/*.{gif,png,svg}'],
  replacePrefix: `/public`,
  stripPrefix: './build/public',
  runtimeCaching: [{
    urlPattern: /\w*json\b/,
    handler: 'cacheFirst'
  }]
})

const polyfills = () => rollup({ context: 'window', plugins: [ uglify(uglifyOptions) ], entry: 'src/app/utils/polyfills.min.js' })
  .then((bundle) => bundle.write({ format: 'iife', dest: `build/public/polyfills.min.js` }))

const tasks = new Map()
const run = (task) => {
  const start = new Date()
  return Promise.all([].concat(tasks.get(task)())).then(() => {
    console.log(`[build] '${task}' done in ${new Date().getTime() - start.getTime()}ms`)
  }, (err) => console.error(err.stack))
}

tasks.set('build', () => Promise.all([client(), polyfills(), css(), server()]).then(() => sw()))

run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'build')
