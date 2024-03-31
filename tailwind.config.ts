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
           primary: '#F2BED1',
           secondary: '#FBDDE8',
           accent: '#FDCEDF',
           neutral: '#F2BED1',
           'base-100': '#F9F5F6',
           'base-200': '#F8E8EE',
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
