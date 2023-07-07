/** @type {import('tailwindcss').Config} */
module.exports = {
  //to purge css,search for css
  content: ['./sec/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundColor:["disabled"],
      textColor:["disabled"]
    },
  },

  plugins: [],
  safelist:['bg-blue-400','bg-green-400','bg-red-400']
}

