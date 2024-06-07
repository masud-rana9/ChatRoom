import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3572EF",
        textBlack: "#1B1818",
        textBlueBlack: "#1D2939",
        textDarkGrey: "#403C3C",
        textGreyBlack: "#312F2F",
        textGrey: "#645D5D",
        borderColor: "#D5D8DB",
        success: "#2AAE09",
        red: "#E11C1B",
      },
    },
    backgroundImage: {},
  },
  plugins: [],
};
export default config;
