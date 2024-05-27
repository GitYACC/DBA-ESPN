import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'grid-pattern': 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
      },
      fontSize: {
        "2xs": ["0.625rem", {"lineHeight": "0.75rem"}],
        "3xs": ["0.5rem", {"lineHeight": "0.5rem"}]
      },
      gridTemplateColumn: {
        "16": "repeat(16, minmax(0, 1fr))"
      },
      backgroundSize: {
        'grid-size': '4rem 4rem', // Adjust the size as needed
      },
    },
  },
  plugins: [],
};
export default config;
