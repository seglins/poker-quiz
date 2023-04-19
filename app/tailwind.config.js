import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},
			colors: {
				primary: '#2F80ED',
				destructive: '#EB5757',
				neutral: {
					light: '#E9E9E9',
					DEFAULT: '#C8C8C8',
					dark: '#8E8E8E'
				}
			}
		}
	},
	plugins: [
		plugin(({ addBase, theme }) => {
			addBase({
				html: {
					fontSize: '14px'
				},
				body: {
					padding: `${theme('spacing.10')} ${theme('spacing.6')}`
				}
			});
		})
	]
};
