/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], // где Tailwind должен сканировать классы
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: { themes: ["light","dark"] } // переключение тем
};
