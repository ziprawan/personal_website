/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        h1: ["2em", "34px"],
        h2: ["1.5em", "32px"],
        h3: ["1.17em", "26px"],
        h4: ["1em", "22px"],
        h5: ["0.83em", "20px"],
        h6: ["0.67em", "18px"],
      },
    },
  },
  plugins: [],
};
