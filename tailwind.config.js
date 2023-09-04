/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fluidTypography: {
      maxScreenSize: 2560,
  },
    extend: {
      minHeight: {
      '48': '12rem',
      },
      maxHeight: {
        '125': '31.25rem',
        },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require("tailwind-fluid-typography")]
}