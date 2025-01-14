/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript and TypeScript files in the `src` folder
    "./public/index.html",       // Include the HTML file for global class scanning
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
