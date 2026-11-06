/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0b",
        panel: "#141414",
        panel2: "#1b1b1b",
        line: "#2a2a2a",
        accent: "#ccff00",
        muted: "#9a9a9a",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
