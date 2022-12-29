/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		"./src/**/*.{html,ts}"
	],
	theme: {
		screens: {
			'tablet': '642px',
			'desktop': '1263px'
		},
	},
	plugins: [],
}
