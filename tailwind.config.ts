import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102a43",
        brand: { 50: "#f0f9ff", 100: "#e0f2fe", 500: "#60a5fa", 600: "#3b82f6", 700: "#2563eb" },
        coral: "#3b82f6",
        cream: "#fbfaf6"
      },
      boxShadow: { soft: "0 18px 50px rgba(16,42,67,.08)" },
      fontFamily: { sans: ["var(--font-sans)", "sans-serif"], display: ["var(--font-display)", "sans-serif"] }
    }
  },
  plugins: []
};
export default config;
