module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Google Sans", "Arial", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      primary: "var(--color-primary)",
      content: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        normal: "var(--interactive-text-normal)",
        hover: "var(--interactive-text-hover)",
        active: "var(--interactive-text-active)",
      },
      elevation: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
        normal: "var(--interactive-background-normal)",
        hover: "var(--interactive-background-hover)",
        active: "var(--interactive-background-active)",
      },
      modifier: {
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
      },
    },
    extend: {
      fontSize: {
        rg: "13px",
        md: "15px",
      },
      spacing: {
        13: "52px",
        18: "72px",
        41: "164px",
        58: "232px",
        90: "360px",
        120: "580px",
        180: "720px",
        225: "900px",
        "16p": "16%",
        "24p": "24%",
      },
      minWidth: {
        22: "84px",
        41: "164px",
      },
      maxWidth: {
        60: "240px",
        90: "360px",
        120: "580px",
        180: "720px",
        225: "900px",
      },
      maxHeight: {
        200: "800px",
      },
      boxShadow: {
        "elevation-x": "0 0 16px rgb(0 0 0 / 28%)",
      },
    },
  },
  plugins: [],
};
