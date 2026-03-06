/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#0B0B0E',
                card: '#1A1A21',
                cardHover: '#2C2C36',
                primary: '#FF5500', // Dark Orange
                textMuted: '#8F8F99',
                textPrimary: '#FFFFFF',
            },
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
                secondary: ['Roboto', 'sans-serif'],
            },
            spacing: {
                'safe-top': '48px',
                'safe-bottom': '48px',
                'safe-left': '64px',
                'safe-right': '64px',
            },
            borderRadius: {
                'card': '16px',
                'focus': '24px',
            }
        },
    },
    plugins: [],
}
