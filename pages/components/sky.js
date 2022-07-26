import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import { debounce } from "throttle-debounce";
import Cloud from "./cloud.js";

const Sky = (props) => {
  const { debouncerDelayInMs, cloudCoverageInPercent } = props;

  const skyRef = useRef(null);

  const [skyDimensionsInPx, setSkyDimensionsInPx] = useState({
    width: 0,
    height: 0,
  });
  const [cloudPosition, setCloudPosition] = useState({ x: 0, y: 0 });

  const updateSkyDimensions = debounce(debouncerDelayInMs, () => {
    const { width, height } = skyRef.current.getBoundingClientRect();
    setSkyDimensionsInPx({ width, height });
  });

  const getRandomNumberBetweenMinMax = (min, max) =>
    min + Math.random() * (max - min);

  const getRandomCloudPosition = () => {
    const x = getRandomNumberBetweenMinMax(0, skyDimensionsInPx.width);
    const y = getRandomNumberBetweenMinMax(
      0,
      (skyDimensionsInPx.height * cloudCoverageInPercent) / 100
    );
    return { x, y };
  };

  useEffect(() => {
    setCloudPosition(getRandomCloudPosition());
  }, [skyDimensionsInPx]);

  useEffect(() => {
    window.addEventListener("resize", updateSkyDimensions);
    updateSkyDimensions();

    return () => window.removeEventListener("resize", updateSkyDimensions);
  }, []);

  return (
    <div
      ref={skyRef}
      css={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0",
        left: "0",
        overflow: "hidden",
      }}
    >
      {cloudPosition.x !== 0 && cloudPosition.y !== 0 && (
        <Cloud
          skyDimensionsInPx={skyDimensionsInPx}
          initialPosition={cloudPosition}
        />
      )}
    </div>
  );
};

export default Sky;

Sky.defaultProps = {
  debouncerDelayInMs: 500,
  cloudCoverageInPercent: 20,
};

Sky.propTypes = {
  debouncerDelayInMs: PropTypes.number,
  cloudCoverageInPercent: PropTypes.number,
};
