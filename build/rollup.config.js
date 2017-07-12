const buble = require('rollup-plugin-buble')
const pkg = require('../package.json')

module.exports = {
  entry: 'src/vuex-loading.js',
  dest: pkg.main,
  format: 'umd',
  plugins: [buble()],
  moduleName: 'createVuexLoader',
  banner:
`/**
 * @license
 *
 * vuex-loading v${process.env.VERSION || pkg.version}
 *
 * (c) ${new Date().getFullYear()} Fatih Kadir Akın <fatihkadirakin@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */`
}