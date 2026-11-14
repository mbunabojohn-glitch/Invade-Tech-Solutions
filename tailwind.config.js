/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        testimonialFlow: {
          "0%": {
            opacity: "0",
            transform: "translateY(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        testimonialPhotoGlow: {
          "0%": {
            boxShadow: "inset 0 0 0 rgba(6, 182, 212, 0)",
          },
          "100%": {
            boxShadow: "inset 0 0 24px rgba(6, 182, 212, 0.25)",
          },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-up-delay-1": "fadeInUp 0.8s ease-out 0.2s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.8s ease-out 0.4s forwards",
        "testimonial-flow": "testimonialFlow 0.7s ease-out",
        "testimonial-photo-glow": "testimonialPhotoGlow 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
