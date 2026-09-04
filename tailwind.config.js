module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./assets/js/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C63FB',
          hover: '#0B4ED8',
        },
        navy: {
          DEFAULT: '#071426',
          dark: '#020817',
        },
        midnight: '#020817',
        paper: '#F8F7F4',
        ink: '#172033',
        slate: {
          custom: '#596579',
        },
        hairline: '#D9DEE7',
        dark: {
          DEFAULT: '#1a1a1a',
          footer: '#333333',
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        garamond: ['Cormorant Garamond', 'serif'],
      },
      aspectRatio: {
        'book-cover': '600 / 832',
        'character': '3 / 4',
      }
    },
  },
  plugins: [],
}
