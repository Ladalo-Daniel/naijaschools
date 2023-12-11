import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      slate: "#0f172a",
      white: "rgb(255, 255, 255)",
      black: "rgb(0,0,0)",

      green: "#15803d",
      darkGreen: "#14532d",
      lightGreen: "#22c55e",
      lightRed: "#ef4444",
      lightPink: "#fecaca",
      orange: "#ea580c",
      lime: "#84cc16",
      yellow: "#d97706",
      darkSlate: "#0f172a",
      lightSlate: "#0f172a",
      lightSlate1: "#e2e8f0",
      lightSlate2: "#cbd5e1",
      whiteGreen: "#f0fdf4",
      lightGray:"#6b7280",
      gray:"#4b5563",
    },
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [nextui()],
}
