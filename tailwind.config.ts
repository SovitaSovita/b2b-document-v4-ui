import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cover_auth": "url('../public/120382.jpg')",
      },
      fontFamily: {
        'Figtree': ['Figtree', 'sans-serif'],
        'Anton': ['Anton', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "blue",
        secondary: "teal",
        // neutral: "#1f29371a"
      },
    }, "dark", "cupcake", "cyberpunk"],
  },
};
export default config;
