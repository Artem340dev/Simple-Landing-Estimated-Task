import type { Config } from "tailwindcss";

const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        light: "1px 1px 2px rgba(0, 0, 0, 0.25)", // Легкая черная тень
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.25)", // Стандартная
      },
      fontFamily: {
        interTight: ['"Inter Tight"', 'sans-serif'],
        merri: ['"Merriweather"', 'serif'],
      },
      fontSize: {
        'sm-base': ['0.9375rem', '1.5rem'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800'
      },
      colors: {
        backgroundColor: "#EFEEEC",
        primaryColor: "#232323",
        secondaryColor: "#A2A2A2",
        emphasizingColor: "#E2E2E2",
        emphasizingColor2: "#F4F4F4",
        emphasizingColor3: "#202020",
        redColor: "#F44336",
        roseColor: "#FF78B7",
        warnColor: "#FF4C4C",

        borderColor: "#CFCFCF",
        
        primaryText: "#232323",
        redText: "#F44336",
        roseText: "#FF78B7",
        secondaryText: "#A2A2A2",

        oppositeText: "#EFEEEC"
      },
    },
    variants: {
      extend: {
        before: ['responsive'],
        after: ['responsive'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {
            secondary: {
              DEFAULT: '#FF78B7',
            }
          },
          colors: {
            secondary: {
              DEFAULT: '#FF78B7',
            }
          },
        },
        dark: {
          layout: {
            secondary: {
              DEFAULT: '#FF78B7'
            }
          },
          colors: {
            secondary: {
              DEFAULT: '#FF78B7'
            }
          },
        },
      },
    }),
  ],
} satisfies Config;