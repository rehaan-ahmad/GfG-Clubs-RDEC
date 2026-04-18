import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'rdec-bg':      'var(--bg)',
        'rdec-alt':     'var(--bg-alt)',
        'rdec-card':    'var(--bg-card)',
        'rdec-accent':  'var(--accent)',
        'rdec-soft':    'var(--accent-soft)',
        'rdec-muted':   'var(--muted)',
        'rdec-text':    'var(--text)',
        'rdec-dimmed':  'var(--text-muted)',
        'rdec-border':  'var(--border)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        button:  ['var(--font-button)'],
        body:    ['var(--font-body)'],
      },
      borderRadius: {
        glass: '14px',
        card:  '10px',
        pill:  '9999px',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
}
export default config
