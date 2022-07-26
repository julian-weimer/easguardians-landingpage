import colors from "../common/colors.js";
import AnimatedRandomGlyphs from "./animated-random-glyphs.js";

const IntroductionText = () => {
  return (
    <>
      <p css={{ color: colors["neutral-700"], textAlign: "center" }}>
        Ea, the sumerian master shaper of the world, god of wisdom and of all
        magic, is our symbol for hard work and quality.
      </p>
      <AnimatedRandomGlyphs />
    </>
  );
};

export default IntroductionText;
