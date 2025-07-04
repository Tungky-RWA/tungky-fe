/** @type {import('tailwindcss').Config} */
import { withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi({
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'bounce-subtle': 'bounceSubtle 2s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			bounceSubtle: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-5px)'
  				}
  			}
  		},
  		fontFamily: {
  			zentry: [
  				'zentry',
  				'sans-serif'
  			],
  			general: [
  				'general',
  				'sans-serif'
  			],
  			'circular-web': [
  				'circular-web',
  				'sans-serif'
  			],
  			'robert-medium': [
  				'robert-medium',
  				'sans-serif'
  			],
  			'robert-regular': [
  				'robert-regular',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: {
  				DEFAULT: '#7C3AED',
  				dark: '#7C3AED',
  				light: '#A78BFA',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: '#334155',
  				light: '#334155',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: '#67E8F9',
  				light: '#67E8F9',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			blue: {
  				'50': '#DFDFF0',
  				'75': '#dfdff2',
  				'100': '#F0F2FA',
  				'200': '#010101',
  				'300': '#4FB7DD'
  			},
  			violet: {
  				'300': '#5724ff'
  			},
  			yellow: {
  				'100': '#8e983f',
  				'300': '#edff66'
  			},
  			navy: '#1E293B',
  			slate: '#334155',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
				// Web3 Neon Colors
				neon: {
					purple: '#8B5CF6',
					blue: '#06B6D4',
					green: '#10B981',
					pink: '#EC4899',
					cyan: '#06B6D4'
				},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
});