const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const replace = require('@rollup/plugin-replace');
const postcss = require('rollup-plugin-postcss');

module.exports = {
	input: 'platform/initial.ts',
	output: {
		file: 'public/platform/initial.js',
		format: 'iife',
		name: 'CorieScript',
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			preventAssignment: true,
		}),
		resolve(),
		commonjs(),
		typescript({
			tsconfig: './platform/tsconfig.platform.json',
		}),
		terser(),
		postcss({
			config: {
				path: './platform/ui/config/postcss.config.js',
			},
			extensions: ['.css'],
			minimize: true,
			inject: {
				insertAt: 'top',
			},
		}),
	],
	watch: { include: 'platform/**' },
};
