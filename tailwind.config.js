/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'tangerine': {
					DEFAULT: '#fc4024',
					50: '#FFFFFF',
					100: '#FFFFFF',
					200: '#FDEBE7',
					300: '#FBCBC1',
					400: '#F8AC9B',
					500: '#ffad43',
					600: '#ff7a66',
					700: '#fc4024',
					800: '#B52B0D',
					900: '#801F09'
				},
        'graycustom': {
          DEFAULT: '#94A3B8',
          400: '#E2E8F0',
          500: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
}

