import settings from "./settings.js";

function pxToRem(spacing) {
  return spacing / settings.baseFontSize + "rem";
}

function px(spacing) {
  return spacing + "px";
}

function getRandomNumberBetweenMinMax(min, max) {
  return min + Math.random() * (max - min);
}

export { pxToRem, px, getRandomNumberBetweenMinMax };
