import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

import pkg from './package.json';

function distBuild(options) {
    options = options || {};

    return {
        input: 'src/vuex-loading.js',
        output: {
            file: `dist/${options.filename}`,
            format: options.format,
            name: 'VuexLoading',
            sourcemap: options.sourcemap,
        },
        plugins: [
			vue({
				compileTemplate: true
			}),
            babel({
				exclude: ['node_modules/**'],
				runtimeHelpers: true
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            resolve({
                browser: true,
            }), // so rollup can find node modules
            commonjs(), // so rollup can convert node modules to ESM if needed
            options.minify && uglify(),
        ]
    };
}

const externals = new Set(Object.keys(pkg.dependencies));

function standardBuilds(filename) {
    return {
        input: `src/${filename}.js`,
        external: (id /*: string */) => {
            if (externals.has(id)) {
                return true;
            }

            // Mark deep imports from inline-style-prefixer as external.
            return /^inline-style-prefixer\//.test(id);
        },
        output: [
            { file: `lib/${filename}.js`, format: 'cjs' },
            { file: `es/${filename}.js`, format: 'es' },
        ],
        plugins: [
			vue({
				compileTemplate: true
			}),
            babel({
				exclude: ['node_modules/**'],
				runtimeHelpers: true
            }),
            commonjs(), // so rollup can convert node modules to ESM if needed
        ]
    };
}

export default [
    distBuild({ filename: 'vuex-loading.umd.js', format: 'umd', sourcemap: true, minify: false }),
    distBuild({ filename: 'vuex-loading.umd.min.js', format: 'umd', sourcemap: true, minify: true }),
    distBuild({ filename: 'vuex-loading.js', format: 'cjs', sourcemap: false, minify: false }),
    standardBuilds('vuex-loading'),
];

