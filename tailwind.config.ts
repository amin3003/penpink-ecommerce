import type { Config } from 'tailwindcss';
 import daisyui from 'daisyui';
 const config: Config = {
		content: [
			/* --------------------------- styles for base app -------------------------- */
			'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
			/* --------------------------- styles for admin ui -------------------------- */
			'./node_modules/@codespase/adminui/dist/**/*.{js,ts,jsx,tsx,mdx}',
		],
		daisyui: {
			themes: [
				{
					light: {
						...require('daisyui/src/theming/themes')['valentine'],
						// primary: '#F2BED1',
						primary: '#ff91b9',
						secondary: '#FBDDE8',
						accent: '#FDCEDF',
						neutral: '#F2BED1',
						'primary-content': '#F9F5F6',
						'base-content': '#000',
						'neutral-content': '#000',
						'base-100': '#F9F5F6',
						'base-200': '#F8E8EE',
						'base-300': '#F8E8EE',
						'--rounded-box': '0.2rem', // border radius rounded-box utility class, used in card and other large boxes
						'--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
						'--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
						'--animation-btn': '0.25s', // duration of animation when you click on button
						'--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
						'--btn-focus-scale': '0.95', // scale transform of button when you focus on it
						'--border-btn': '1px', // border width of buttons
						'--tab-border': '1px', // border width of tabs
						'--tab-radius': '0.5rem', // border radius of tabs
					},
				},
			],
		},
		theme: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1240px',
			},
			extend: {
				backgroundImage: {
					'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
					'gradient-conic':
						'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				},
			},
		},
		plugins: [require('@tailwindcss/typography'), daisyui],
 };
export default config;
