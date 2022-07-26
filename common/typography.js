import Typography from "typography";
import settings from "./settings.js";

const typography = new Typography({
  baseFontSize: `${settings.baseFontSize}px`,
  baseLineHeight: 1.666,
  headerFontFamily: ["Maven Pro", "Helvetica", "sans-serif"],
  bodyFontFamily: ["Maven Pro", "Helvetica", "sans-serif"],
  googleFonts: [
    {
      name: "Maven Pro",
      styles: ["400", "500"],
    },
  ],
});

export default typography;
