/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        animation: {
          aurora: 'auroraMove 10s linear infinite',
        },
        keyframes: {
          auroraMove: {
            '0%': { backgroundPosition: '0% 50%' },
            '100%': { backgroundPosition: '200% 50%' },
          },
        },
      },
    },
    plugins: [],
  };
  