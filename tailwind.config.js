/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[theme="dark"]'],
  theme: {
    fontFamily: {
      head: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-nunito-sans)", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      backgroundColor: {
        primary: "rgb(var(--bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
        fourth: "rgb(var(--bg-fourth) / <alpha-value>)"
      },
      textColor: {
        primary: "rgb(var(--tx-primary) / <alpha-value>)",
        secondary: "rgb(var(--tx-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--tx-tertiary) / <alpha-value>)"
      },
      borderColor: {
        primary: "rgb(var(--br-primary) / <alpha-value>)",
        secondary: "rgb(var(--br-secondary) / <alpha-value>)"
      },
      fill: {
        primary: "rgb(var(--ic-primary) / <alpha-value>)",
        secondary: "rgb(var(--ic-secondary) / <alpha-value>)"
      },
      colors: {
        white: "rgb(var(--white) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
        "ac-primary": {
          500: "rgb(var(--ac-primary-500) / <alpha-value>)",
          600: "rgb(var(--ac-primary-600) / <alpha-value>)"
        }
      }
    }
  },
  plugins: [],
}