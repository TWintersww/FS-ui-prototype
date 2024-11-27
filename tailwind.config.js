/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all files with Tailwind classes are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

