/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        petrols: ["GT-Proelium-Sharp", "sans-serif"],       
        kenyna: ["kenyan",],       
        kenynarg: ["kenyanrg",],       
      },
      backgroundColor:{
        primary :'#F0EAEA',
        // side:'#D9D9D9',
         side:'#c5c3c6',

      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
