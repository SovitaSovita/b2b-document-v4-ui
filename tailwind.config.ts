import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [require("daisyui"), nextui()],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "rgb(246, 248, 252)",
        secondary: "#2b67e8",
        neutral: "#fff",
      },
    }, "light"],
  },
};
export default config;
