/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js}",
    ],
    theme: {
        extend: {
          colors: {
            gray: {
              DEFAULT: '#20222c'
            }
          }
        },
    },
    plugins: [],
}
