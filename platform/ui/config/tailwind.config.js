const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [path.resolve(__dirname, '../../**/*.{ts,tsx}')],
	prefix: 'corie-',
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeOut: {
					'0%': { opacity: '1', transform: 'translateY(0px)' },
					'100%': { opacity: '0', transform: 'translateY(24px)' },
				},
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.25s ease-out forwards',
				'fade-out': 'fadeOut 0.25s ease-out forwards',
			},
		},
	},
	plugins: [],
};
