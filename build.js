const fs = require('fs')
const rollup = require('rollup').rollup
const _sass = require('node-sass')
const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const url = require('rollup-plugin-url')
const cssnano = require('cssnano').process
const purifycss = require('purify-css')
const optimizeJs = require('optimize-js')
const { name, version, dependencies } = require('./package')
const swPrecache = require('sw-precache')
const nodeRev = require('node-rev').default
const _exec = require('child_process').exec
const external = Object.keys(dependencies).concat(['fs', 'path'])
const images = url({ limit: 1, publicPath: `/public/` })
const promisify = (ctx, func = ctx) => (...args) => {
  return new Promise((resolve, reject) => {
    func.apply(ctx, [...args, (err, result) => err ? reject(err) : resolve(result)])
  })
}
let clientCache, serverCache
const writeFile = promisify(fs.writeFile)
const sass = promisify(_sass.render)
const exec = promisify(_exec)

const server = () => rollup({
  cache: serverCache,
  entry: 'src/server/server.js',
  external,
  plugins: [
    replace({'__CLIENT__': false}),
    json(),
    commonjs({ extensions: [ '.js', '.json' ] }),
    buble({ jsx: 'h' })
  ]
}).then((bundle) => {
  serverCache = bundle
  return bundle.write({ sourceMap: true, format: 'cjs', dest: `build/server.js` })
})

const client = () => rollup({
  cache: clientCache,
  entry: 'src/app/entry.js',
  context: 'window',
  plugins: [
    nodeResolve({ jsnext: true, browser: true }),
    commonjs({ include: ['node_modules/**'], namedExports: { 'preact-redux': ['connect', 'Provider'] } }),
    replace({ '__CLIENT__': true, 'process.env.NODE_ENV': JSON.stringify('production') }),
    images,
    buble({ jsx: 'h' }),
    uglify()
  ]
})
.then((bundle) => {
  clientCache = bundle
  return bundle.generate({ sourceMap: true, format: 'iife' })
})
.then(({ code, map }) => Promise.all([
  writeFile(`build/public/bundle.js`, optimizeJs(code) + `//# sourceMappingURL=/public/bundle.js.map`),
  writeFile(`build/public/bundle.js.map`, map.toString()),
  images.write({ dest: 'build/public/xyz.js' })
]))

const css = () => sass({ file: `src/app/styles/entry.scss` })
  .then(({ css }) => purifycss(['src/app/components/**/*.js'], css.toString()))
  .then((purified) => cssnano(purified, { autoprefixer: { add: true } }))
  .then(({ css }) => writeFile(`build/public/bundle.css`, css))

const sw = () => swPrecache.write('build/public/service-worker.js', {
  cacheId: `${name}-${version}`, // include version incase we need to bump and dump
  directoryIndex: '/',
  staticFileGlobs: [
    '/',
    './build/public/manifest.json',
    //'./build/public/bundle-*.{js}', // depends if we inlineJs or not
    './build/public/*.{gif,png,svg}'
  ],
  navigateFallback: '/',
  dynamicUrlToDependencies: {
    '/': ['./src/server/routes/root.js', './src/app/components/App.js']
  },
  dontCacheBustUrlsMatching: [
    /\.(js|css)$/
  ],
  skipWaiting: true,
  replacePrefix: `/public`,
  stripPrefix: './build/public',
  runtimeCaching: [{
    urlPattern: /\/posts/,
    handler: 'cacheFirst'
  },
  {
    urlPattern: /\/articles/,
    handler: 'cacheFirst'
  }]
})

const rev = () => Promise.resolve().then(() => nodeRev({
  files: './build/public/bundle.css,./build/public/bundle.js',
  outputDir: './build/public/',
  file: './build/assets.json',
  hash: true
}))

const clean = () => exec('rm -rf ./build && mkdir -p ./build/public')
const polyfills = () => exec(`cp src/app/utils/polyfills.min.js build/public/`)
const copy = () => exec(`cp -R src/app/static/. build/public/`)

const tasks = new Map()
const run = (task) => {
  const start = new Date()
  return Promise.all([].concat(tasks.get(task)())).then(() => {
    console.log(`[build] '${task}' done in ${new Date().getTime() - start.getTime()}ms`)
  }, (err) => console.error(err.stack))
}

tasks.set('client', client)
tasks.set('css', css)
tasks.set('polyfills', polyfills)
tasks.set('copy', copy)
tasks.set('clean', clean)
tasks.set('rev', rev)
tasks.set('sw', sw)
tasks.set('server', server)
tasks.set('build', () =>
  run('clean')
  .then(() => Promise.all([run('client'), run('css'), run('polyfills'), run('copy')]))
  .then(() => run('rev'))
  .then(() => Promise.all([run('server'), run('sw')]))
)

run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'build')
