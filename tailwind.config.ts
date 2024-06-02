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
      },
      backgroundColor: {
        "base-main": "rgb(246, 248, 252)",
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "rgb(246, 248, 252)",
        secondary: "#2b67e8",
        neutral: "rgb(107 114 128 / 1",
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        primary: "oklch(0.232607 0.013807 253.101)",
        secondary: "teal",
        neutral: "#1f29371a"
      },
    }, "dark", "cupcake", "cyberpunk"],
  },
};
export default config;
