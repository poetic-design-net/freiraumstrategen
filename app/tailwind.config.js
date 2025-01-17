/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: [
    // Safelist padding classes used in section styles
    'pt-12', 'pb-12',
    'pt-20', 'pb-20',
    'pt-24', 'pb-24',
    'pt-32', 'pb-32',
    // Responsive variants
    'md:pt-12', 'md:pb-12',
    'md:pt-20', 'md:pb-20',
    'md:pt-24', 'md:pb-24',
    'md:pt-32', 'md:pb-32',
    'lg:pt-12', 'lg:pb-12',
    'lg:pt-20', 'lg:pb-20',
    'lg:pt-24', 'lg:pb-24',
    'lg:pt-32', 'lg:pb-32',
    'xl:pt-12', 'xl:pb-12',
    'xl:pt-20', 'xl:pb-20',
    'xl:pt-24', 'xl:pb-24',
    'xl:pt-32', 'xl:pb-32',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'sofia': ['"sofia-pro"', 'sans-serif'],
      },
	  backgroundImage: {
		'radial-gradient': 'radial-gradient(446.50% 301.92% at 50.09% 3.49%, #002c33 13.21%, #0b8695 27.92%, #000 34.17%)',
	},
          aspectRatio: {
        '21/9': '21 / 9',
        '16/9': '16 / 9',
      },
	  margin: {
        '-15': '-60px', // Benutzerdefinierte Klasse -mb-15 für -60px
      },
      colors: {
		'ultra-light': '#FDFDFD', // #FAFAFA
        border: "hsl(var(--border) / <alpha-value>)",
		input: "hsl(var(--input) / <alpha-value>)",
		ring: "hsl(var(--ring) / <alpha-value>)",
		background: "hsl(var(--background) / <alpha-value>)",
		foreground: "hsl(var(--foreground) / <alpha-value>)",
		primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
					50: 'hsl(var(--color-primary-50) / <alpha-value>)',
					100: 'hsl(var(--color-primary-100) / <alpha-value>)',
					200: 'hsl(var(--color-primary-200) / <alpha-value>)',
					300: 'hsl(var(--color-primary-300) / <alpha-value>)',
					400: 'hsl(var(--color-primary-400) / <alpha-value>)',
					500: 'hsl(var(--color-primary-500) / <alpha-value>)',
					600: 'hsl(var(--color-primary-600) / <alpha-value>)',
					700: 'hsl(var(--color-primary-700) / <alpha-value>)',
					800: 'hsl(var(--color-primary-800) / <alpha-value>)',
					900: 'hsl(var(--color-primary-900) / <alpha-value>)',
					950: 'hsl(var(--color-primary-950) / <alpha-value>)'
				},
		secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
		destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
		muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
		accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
		popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
		card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03',
        '104': '1.04',
      },
			spacing: {
				'18': '4.5rem',  // 72px
				'20': '5rem',    // 80px
				'24': '6rem',    // 96px
				'28': '7rem',    // 112px
				'32': '8rem',    // 128px
				'48': '12rem',  // Dies existiert bereits
				'52': '13rem',
				'56': '14rem',
				'60': '15rem',
				'64': '16rem',
				'72': '18rem',
				'80': '20rem',
				'96': '24rem',
      },
      animation: {
        meteor: "meteor 5s linear infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
				  "70%": { opacity: "1" },
				  "100%": {
					transform: "rotate(215deg) translateX(-1000px)",
					opacity: "0",
				  },
        },
        gradient: {
          to: { "background-position": "200% center" },
        },
      },
    },
  },
  plugins: [
	require('@tailwindcss/aspect-ratio'), 
  ],
}
