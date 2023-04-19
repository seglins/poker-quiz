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
				danger: '#EB5757',
				neutral: {
					light: '#C8C8C8',
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
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					minHeight: '100vh',
					padding: `${theme('spacing.8')} ${theme('spacing.4')}`
				}
			});
		})
	]
};
