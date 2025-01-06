import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-in": {
          "0%": { },
          "100%": { },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)"},
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in-up": "slide-in-up 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
  // corePlugins:(
  //   preflight:false,
  // )
};
export default config;
