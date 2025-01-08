/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "full-height":"calc(100vh - 64px)",
        "full-height-with-paddings":"calc(100vh - 96px)",
      },
    },
  },
  plugins: [],
}

