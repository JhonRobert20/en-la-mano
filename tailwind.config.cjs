const plugin = require('tailwindcss/plugin')
const neutral = '#f4f4f4'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'linear-gradient':
          'linear-gradient(108deg, #b84df5 -18.5%, #3f0b79 34%, #060247 88.5%)'
      },
      colors: {
        primary: '#07024a',
        secondary: '#c644fd',
        tertiary: '#3f0b79',
        success: '#25d366',
        warning: '#ff7100',
        neutral,
        gray: '#cbcbcb'
      },
      fontFamily: {
        sans: ['Graphie', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif']
      },
      spacing: { 15: '3.75rem', 18: '4.5rem', 25: '6.25rem' },
      screens: { '-lg': { max: '1023px' } }
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.scroll-reset': {
          animation: 'reset linear both',
          animationRange: '0 3rem',
          animationTimeline: 'scroll()',
          '@keyframes reset': {
            to: { backgroundColor: 'transparent', color: neutral }
          }
        },
        '.scroll-lighten': {
          animation: 'lighten linear both',
          animationRange: '0 3rem',
          animationTimeline: 'scroll()',
          '@keyframes lighten': {
            to: { backgroundImage: 'url(/assets/logo-light.webp)' }
          }
        }
      })
    })
  ]
}
