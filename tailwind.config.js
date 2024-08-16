/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      blue: {
        DEFAULT: "var(--colour-blue)",
        dark: "var(--colour-blue-dark)",
        light: "var(--colour-blue-light)",
        soft: "var(--colour-blue-soft)"
      },
      green: {
        DEFAULT: "var(--colour-green)",
        dark: "var(--colour-green-dark)",
        light: "var(--colour-green-light)",
        soft: "var(--colour-green-soft)"
      },
      orange: {
        DEFAULT: "var(--colour-orange)",
        dark: "var(--colour-orange-dark)",
        light: "var(--colour-orange-light)",
        soft: "var(--colour-orange-soft)"
      },
      red: {
        DEFAULT: "var(--colour-red)",
        dark: "var(--colour-red-dark)",
        light: "var(--colour-red-light)",
        soft: "var(--colour-red-soft)"
      },
      cyan: {
        DEFAULT: "var(--colour-cyan)",
        dark: "var(--colour-cyan-dark)",
        light: "var(--colour-cyan-light)",
        soft: "var(--colour-cyan-soft)"
      },
      txt: {
        DEFAULT: "var(--colour-text)",
        muted: "var(--colour-text-muted)",
        white: "var(--colour-text-white)"
      },
      bg: {
        light: {
          DEFAULT: "var(--colour-surface-light)",
          secondary: "var(--colour-surface-light-secondary)"
        },
        dark: {
          DEFAULT: "var(--colour-surface-dark)",
          secondary: "var(--colour-surface-dark-secondary)"
        }
      }
    },
    fontSize: {
      "2xl": "18px",
      xl: "16px",
      l: "14px",
      md: "12px",
      sm: "10px",
      s: "8px"
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    borderRadius: {
      0: "0px",
      50: "4px",
      100: "8px",
      200: "16px",
      300: "24px",
      400: "32px",
      full: "999px"
    },
    spacing: {
      0: "0px",
      25: "2px",
      50: "4px",
      100: "8px",
      200: "16px",
      300: "24px",
      400: "32px",
      500: "40px",
      800: "64px"
    },
    extend: {}
  },
  plugins: []
};
