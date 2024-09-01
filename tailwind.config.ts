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
      },
      colors: {
        "grayish-blue": "hsl(220, 14%, 75%)",
        "light-grayish-blue": "hsl(223, 64%, 98%)",
        "dark-grayish-blue": "hsl(217, 9%, 45%)",
        "very-dark-blue": "hsl(209, 13%, 13%)",
        "primary-orange": "hsl(26, 100%, 55%)",
        "pale-orange": "hsl(25, 100%, 94%)",
      },
    },
  },
  plugins: [],
};
export default config;
