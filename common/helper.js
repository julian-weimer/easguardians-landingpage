import settings from "./settings.js";

function pxToRem(spacing) {
  return spacing / settings.baseFontSize + "rem";
}

function px(spacing) {
  return spacing + "px";
}

export { pxToRem, px };
