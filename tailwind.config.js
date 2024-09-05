/** @type {import("tailwindcss").Config} */
const plugin = require("tailwindcss");

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
      silver: {
        DEFAULT: "var(--colour-silver)",
        dark: "var(--colour-silver-dark)",
        light: "var(--colour-silver-light)"
      },
      grey: {
        "75": "var(--colour-grey-75)",
        "100": "var(--colour-grey-100)",
        "200": "var(--colour-grey-200)",
        "300": "var(--colour-grey-300)",
        "400": "var(--colour-grey-400)",
        "500": "var(--colour-grey-500)",
        "600": "var(--colour-grey-600)",
        "700": "var(--colour-grey-700)",
        "800": "var(--colour-grey-800)",
        "900": "var(--colour-grey-900)"
      },
      black: "#000000",
      txt: {
        DEFAULT: "var(--colour-text)",
        muted: "var(--colour-text-muted)",
        white: "var(--colour-text-white)"
      },
      bg: {
        light: {
          DEFAULT: "var(--colour-surface-light)",
          transparant: "#ffffff77",
          secondary: "var(--colour-surface-light-secondary)"
        },
        dark: {
          DEFAULT: "var(--colour-surface-dark)",
          transparant: "#10122577",
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
    extend: {
      maxHeight: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh"
      },
      maxWidth: {
        "10vw": "10vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "40vw": "40vw",
        "50vw": "50vw",
        "60vw": "60vw",
        "70vw": "70vw",
        "80vw": "80vw",
        "90vw": "90vw"
      },
    }
  },
  plugins: [
    plugin(({ addVariant, e, postcss }) => {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()"
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    })
  ]
};
