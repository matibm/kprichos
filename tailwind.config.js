/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-taupe': '#967969',
                'brand-beige': '#F5F5DC',
                'brand-charcoal': '#36454F',
                'brand-cream': '#FAF9F6',
                'brand-gray': '#F9FAFB',
            },
            fontFamily: {
                'sans': ['Lato', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
