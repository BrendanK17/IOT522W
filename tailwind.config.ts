/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Ensure this includes your component files
      "./components/**/*.{js,ts,jsx,tsx}" // Include ShadCN components
    ],
    theme: {
      extend: {
        colors: {
            destructive: {
              DEFAULT: '#dc2626', // Red-600
              hover: '#b91c1c',  // Red-700
            },
          },
      },
    },
    plugins: [],
  }
  