/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // ← Add src/
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // ← Add src/
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ← Add src/
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui"],
         },
         colors: {
            primary: {
               50: "#f0f9ff",
               100: "#e0f2fe",
               200: "#bae6fd",
               300: "#7dd3fc",
               400: "#38bdf8",
               500: "#0ea5e9",
               600: "#0284c7",
               700: "#0369a1",
               800: "#075985",
               900: "#0c4a6e",
            },
            purple: {
               50: "#faf5ff",
               100: "#f3e8ff",
               200: "#e9d5ff",
               300: "#d8b4fe",
               400: "#c084fc",
               500: "#a855f7",
               600: "#9333ea",
               700: "#7c3aed",
               800: "#6b21a8",
               900: "#581c87",
            },
         },
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            "gradient-purple-blue":
               "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "gradient-crypto":
               "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
         },
         animation: {
            float: "float 6s ease-in-out infinite",
            "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            gradient: "gradient 3s ease infinite",
            "fade-in": "fadeIn 0.5s ease-in-out",
            "slide-up": "slideUp 0.5s ease-out",
            "slide-down": "slideDown 0.5s ease-out",
         },
         keyframes: {
            float: {
               "0%, 100%": { transform: "translateY(0px)" },
               "50%": { transform: "translateY(-20px)" },
            },
            fadeIn: {
               "0%": { opacity: "0" },
               "100%": { opacity: "1" },
            },
            slideUp: {
               "0%": { transform: "translateY(20px)", opacity: "0" },
               "100%": { transform: "translateY(0)", opacity: "1" },
            },
            slideDown: {
               "0%": { transform: "translateY(-20px)", opacity: "0" },
               "100%": { transform: "translateY(0)", opacity: "1" },
            },
            gradient: {
               "0%, 100%": { "background-position": "0% 50%" },
               "50%": { "background-position": "100% 50%" },
            },
         },
         spacing: {
            18: "4.5rem",
            88: "22rem",
            120: "30rem",
         },
         maxWidth: {
            "8xl": "88rem",
            "9xl": "96rem",
         },
         backdropBlur: {
            xs: "2px",
         },
         boxShadow: {
            glow: "0 0 20px rgba(139, 92, 246, 0.3)",
            "glow-lg": "0 0 30px rgba(139, 92, 246, 0.4)",
         },
      },
   },
   plugins: [
      require("@tailwindcss/forms"),
      require("@tailwindcss/typography"),
      require("@tailwindcss/aspect-ratio"),
   ],
};
