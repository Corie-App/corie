const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [path.resolve(__dirname, '../../**/*.{ts,tsx}')],
	prefix: 'corie-',
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {},
	},
	plugins: [],
};
