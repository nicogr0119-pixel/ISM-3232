/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // respect prefers-color-scheme
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card-bg)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        danger: "var(--danger)",
        warning: "var(--warning)",
      },
    },
  },
  plugins: [],
};
