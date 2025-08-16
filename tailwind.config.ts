import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const daisyui = require("daisyui");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [forms, daisyui],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
