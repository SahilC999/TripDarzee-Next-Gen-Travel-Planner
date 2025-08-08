/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class", "class"], // ✅ This ensures dark mode toggles via a class
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: '12px',
    			md: '8px',
    			sm: '6px'
    		},
    		colors: {
    			background: 'hsl(var(--background, 0 0% 100%))',
    			foreground: 'hsl(var(--foreground, 0 0% 0%))',
    			card: {
    				DEFAULT: 'hsl(var(--card, 220 10% 96%))',
    				foreground: 'hsl(var(--card-foreground, 220 10% 10%))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover, 220 10% 90%))',
    				foreground: 'hsl(var(--popover-foreground, 220 10% 10%))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary, 222.2 47.4% 11.2%))',
    				foreground: 'hsl(var(--primary-foreground, 210 40% 98%))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary, 210 40% 96%))',
    				foreground: 'hsl(var(--secondary-foreground, 222.2 47.4% 11.2%))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted, 210 40% 90%))',
    				foreground: 'hsl(var(--muted-foreground, 222.2 47.4% 20%))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent, 210 40% 95%))',
    				foreground: 'hsl(var(--accent-foreground, 222.2 47.4% 20%))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive, 0 84% 60%))',
    				foreground: 'hsl(var(--destructive-foreground, 210 40% 98%))'
    			},
    			border: 'hsl(var(--border, 210 40% 90%))',
    			input: 'hsl(var(--input, 210 40% 90%))',
    			ring: 'hsl(var(--ring, 222.2 47.4% 11.2%))',
    			chart: {
    				'1': 'hsl(var(--chart-1, 200 80% 60%))',
    				'2': 'hsl(var(--chart-2, 340 80% 60%))',
    				'3': 'hsl(var(--chart-3, 50 80% 60%))',
    				'4': 'hsl(var(--chart-4, 120 80% 60%))',
    				'5': 'hsl(var(--chart-5, 260 80% 60%))'
    			}
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
  };
  