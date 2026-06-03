/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        secondary: "#fbbf24",
        accent: "#f87171",
        dark: "#1f2937",
        light: "#f3f4f6",
      },
    },
  },
  plugins: [],
}
