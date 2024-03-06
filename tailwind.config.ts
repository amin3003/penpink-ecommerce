import type { Config } from 'tailwindcss';
 import daisyui from 'daisyui';
 const config: Config = {
		content: [
			'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		],
		daisyui: {
			themes: [
				{
					light: {
						...require('daisyui/src/theming/themes')['light'],
						primary: 'rgb(242, 173, 195)',
						secondary: 'rgb(242, 173, 195)',
						accent: 'rgb(242, 173, 195)',
						neutral: 'rgb(242, 173, 195)',
						'base-100': 'rgb(242, 173, 195)',
					},
				},
			],
		},
		theme: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
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
