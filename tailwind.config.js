/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        text: 'var(--color-text)',
        textMuted: 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
