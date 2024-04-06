/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      minHeight: {
      '48': '12rem',
      },
      maxHeight: {
        '125': '31.25rem',
      },
      colors: {
        textPrimary: 'var(--text-primary)',
        textHoverPrimary: 'var(--text-hover-primary)',
        textSecondary: 'var(--text-secondary)',
        textHoverSecondary: 'var(--text-hover-secondary)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        hoverPrimary: 'var(--hover-primary)',
        secondary: 'var(--secondary)',
        hoverSecondary: 'var(--hover-secondary)',
        accent: 'var(--accent)',
        hoverAccent: 'var(--hover-accent)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require("tailwind-fluid-typography")]
}