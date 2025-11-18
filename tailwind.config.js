/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-gold': '#C9A961',
        'primary-gold-dark': '#B89851',
        'primary-dark': '#0F0F0F',
        'background-dark': '#121212',
        'background-card': '#1A1A1A',
        'background-card-dark': '#0F0F0F',
        'text-primary': '#E8E8E8',
        'text-secondary': '#9CA3AF',
        'text-dark': '#0F0F0F',
        'success': '#10B981',
        'error': '#EF4444',
        'warning': '#F59E0B',
        'info': '#3B82F6',
        'border-gold': 'rgba(201, 169, 97, 0.3)',
        'border-gold-full': 'rgba(201, 169, 97, 1)',
      },
    },
  },
  plugins: [],
};

