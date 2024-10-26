import localFont from 'next/font/local';

export const font_body = localFont({
	src: [
		{
			path: '../../public/fonts/Supreme-VariableItalic.ttf',
		},
		{
			path: '../../public/fonts/Supreme-Variable.ttf',
		},
	],
	variable: '--font-body',
});

export const font_title = localFont({
	src: [
		{
			path: '../../public/fonts/Manrope-Variable.ttf',
		},
	],

	variable: '--font-title',
});
