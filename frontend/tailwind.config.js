/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaria: "#d4af37", // Dourado Ai Doctor
        fundo: "#0f172a",    // Azul Dark Premium
        painel: "#1e293b",   // Cor dos Cards
      }
    },
  },
  plugins: [],
}