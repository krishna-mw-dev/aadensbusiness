import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        arden: {
          black: "#0A0A0A",
          panel: "#111827",
          blue: "#2563EB",
          orange: "#F97316",
          text: "#F9FAFB",
          muted: "#9CA3AF",
          steel: "#1F2937",
          green: "#14B8A6"
        }
      },
      fontFamily: {
        heading: ["var(--font-sora)", "Sora", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 46px rgba(37, 99, 235, 0.28)",
        orange: "0 0 38px rgba(249, 115, 22, 0.24)"
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at 20% 20%, rgba(37,99,235,.25), transparent 34%)",
        "radial-orange": "radial-gradient(circle at 82% 18%, rgba(249,115,22,.18), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
