import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['selector'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			keyframes: {
				'button-click': {
					'0%, 100%': {
						scale: '1',
					},
					'50%': {
						scale: '0.95',
					},
				},
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
			},
			animation: {
				'button-click': 'button-click 0.2s ease',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			fontFamily: {
				title: [
					'var(--font-title)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'sans-serif',
				],
				body: [
					'var(--font-body)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'sans-serif',
				],
			},
			colors: {
				link: '#539bf5',
				focus: '#539bf555',
				accent: '#05c8a1',
				'accent-dark': '#06b995',
				light: {
					'100': '#b4b4b4',
					'200': '#b8b8b8',
					'300': '#dadada',
					'400': '#d6d6d6',
					'500': '#e9e9e9',
					'600': '#ececec',
					'700': '#f7f7f7',
					'800': '#fafafa',
					'900': '#ffffff',
				},
				dark: {
					'100': '#414045',
					'200': '#3f3f42',
					'300': '#323234',
					'400': '#2c2c2e',
					'500': '#262627',
					'600': '#202021',
					'700': '#1a1a1b',
					'800': '#0d0d0d',
					'900': '#000000',
				},
				highlight: {
					'100': '#ffffff11',
					'200': '#ffffff22',
					'300': '#ffffff33',
					'400': '#ffffff44',
					'500': '#ffffff55',
					'600': '#ffffff66',
					'700': '#ffffff77',
					'800': '#ffffff88',
					'900': '#ffffff99',
				},
				lowlight: {
					'100': '#00000005',
					'200': '#00000010',
					'300': '#00000015',
					'400': '#00000020',
					'500': '#00000030',
					'600': '#00000040',
					'700': '#00000050',
					'800': '#00000060',
					'900': '#00000070',
				},
				shadow: 'rgba(50, 50, 93, 0.1) 0px 13px 27px -5px, rgba(0, 0, 0, 0.1) 0px 8px 16px -8px',
				disabled: '#ffffff0d',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
};
export default config;
