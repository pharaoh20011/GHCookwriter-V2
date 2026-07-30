module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C63FB',
          hover: '#0c52eb',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          footer: '#333333',
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      aspectRatio: {
        'book-cover': '600 / 832',
      }
    },
  },
  plugins: [],
}
