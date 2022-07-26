import PropTypes from "prop-types";
import { useRef } from "react";
import useInitialCloudPosition from "../hooks/use-initial-cloud-position.js";
import useCloudAnimation from "../hooks/use-cloud-animation.js";
import Cloud from "./cloud.js";

const AnimatedCloud = (props) => {
  const { ready, skyDimensionsInPx, cloudCoverageInPercent, presets, preset } =
    props;

  const ref = useRef(null);

  const animationSpeedInPxPerMs = presets[preset];

  const [initialCloudPosition, initialCloudPositionReady] =
    useInitialCloudPosition({
      skyDimensionsInPx,
      ready,
      cloudCoverageInPercent,
    });
  const animationStyle = useCloudAnimation({
    ref,
    travelDistanceInPx: skyDimensionsInPx.width,
    initialPosition: initialCloudPosition,
    animationSpeedInPxPerMs,
    ready: initialCloudPositionReady,
  });

  return (
    <Cloud
      ref={ref}
      style={animationStyle}
      visible={initialCloudPositionReady}
      preset={preset}
    />
  );
};

export default AnimatedCloud;

AnimatedCloud.defaultProps = {
  ready: false,
  cloudCoverageInPercent: 20,
  preset: "foreground",
  presets: {
    background: 0.01,
    middleground: 0.02,
    foreground: 0.04,
  },
};

AnimatedCloud.propTypes = {
  ready: PropTypes.bool,
  cloudCoverageInPercent: PropTypes.number,
  preset: PropTypes.string,
  presets: PropTypes.object,
  skyDimensionsInPx: PropTypes.objectOf(PropTypes.number),
};
