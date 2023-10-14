/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[theme="dark"]'],
  theme: {
    fontFamily: {
      head: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-nunito-sans)", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      screens: {
        "xs": "480px"
      },
      backgroundColor: {
        primary: "rgb(var(--bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
        fourth: "rgb(var(--bg-fourth) / <alpha-value>)",
        full: "rgb(var(--bg-full) / <alpha-value>)"
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
        },
        trash: "rgb(var(--trash) / <alpha-value>)",
        star: "rgb(var(--star) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)"
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('first-child', "&:first-child");
      addVariant('last-child', "&:last-child");
    }),
    plugin(function ({ addVariant }) {
      addVariant('odd-child', "&>*:nth-child(odd)");
      addVariant('even-child', "&>*:nth-child(even)");
    })
  ],
}