/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minHeight: {
      '48': '12rem',
      },
      maxHeight: {
        '125': '31.25rem',
        },
      gridTemplateColumns: {
        "card-details": "8rem, 1fr "
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),]
}