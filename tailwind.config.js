/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				'inter-regular': ['Inter_400Regular'],
				'inter-medium': ['Inter_500Medium'],
				'inter-semibold': ['Inter_600SemiBold'],
				'inter-bold': ['Inter_700Bold']
			},
			fontSize: {
				display: ['48px', { lineHeight: '50px', letterSpacing: '-1.44px' }],
				'title-lg': ['32px', { lineHeight: '37px', letterSpacing: '-0.8px' }],
				'title-md': ['24px', { lineHeight: '29px', letterSpacing: '-0.48px' }],
				'title-sm': ['18px', { lineHeight: '23px', letterSpacing: '-0.27px' }],
				eyebrow: ['12px', { lineHeight: '14px', letterSpacing: '0.96px' }],
				'body-lg': ['18px', { lineHeight: '29px' }],
				'body-md': ['16px', { lineHeight: '24px' }],
				'body-sm': ['14px', { lineHeight: '21px' }],
				label: ['13px', { lineHeight: '18px' }]
			},
			colors: {
				background: '#FEFCFC',
				brand: {
					DEFAULT: '#D73035',
					hover: '#BF222A',
					strong: '#A7131F',
					subtle: '#FEEBE9'
				},
				destructive: '#8A1114',
				success: '#257D41',
				warning: '#9B6700',
				info: '#046CB9',
				gray: {
					50: '#FDF9F9',
					100: '#F7F3F3',
					200: '#EAE6E6',
					300: '#DAD3D2',
					400: '#A8A1A0',
					500: '#847D7D',
					600: '#6A6463',
					700: '#514B4A',
					800: '#373231',
					900: '#221D1C',
					950: '#120D0D'
				}
			}
		}
	},
	plugins: []
};
