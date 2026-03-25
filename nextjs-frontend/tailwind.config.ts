import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D6DF6",
        secondary: "#00C896",
        accent: "#FFB400",
        neutralDark: "#1A1A1A",
        neutralLight: "#F5F7FA",
      },
      fontFamily: {
        heading: ["var(--font-poppins)"],
        body: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

export default config; 