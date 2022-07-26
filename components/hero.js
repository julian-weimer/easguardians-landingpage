import Image from "next/image";
import colors from "../common/colors.js";
import { pxToRem, px } from "../common/helper.js";
import spacing from "../common/spacing.js";
import IntroductionText from "./introduction-text.js";
import Sky from "./sky.js";

const Hero = () => {
  return (
    <div
      css={{
        height: "100vh",
        background: colors["blue-100"],
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Sky />
      <div
        css={{
          maxWidth: pxToRem(spacing[14]),
          display: "flex",
          flexDirection: "column",
          gap: spacing[2],
          alignItems: "center",
        }}
      >
        <Image
          src="/logo.png"
          objectFit="contain"
          height={px(spacing[8])}
          width={px(spacing[8])}
        />
        <IntroductionText />
      </div>
    </div>
  );
};

export default Hero;
