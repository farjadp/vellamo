/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vellamo: {
          blue: "var(--vellamo-blue)",
          teal: "var(--vellamo-teal)",
          ice: "var(--vellamo-ice)",
          amber: "var(--vellamo-amber)",
          red: "var(--vellamo-red)",
          gray: "var(--vellamo-gray)",
          deep: "var(--vellamo-deep)",
          abyss: "var(--vellamo-abyss)",
        },
      },
      fontFamily: {
        sans: [
          "Outfit",
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
