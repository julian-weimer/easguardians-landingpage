import { useState, useEffect } from "react";
import { getRandomNumberBetweenMinMax } from "../common/helper.js";

const useInitialCloudPosition = (props) => {
  const { skyDimensionsInPx, ready, cloudCoverageInPercent } = props;
  const [cloudPosition, setCloudPosition] = useState({ x: 0, y: 0 });
  const [cloudPositionReady, setCloudPositionReady] = useState(false);

  const getRandomCloudPosition = (dimensions) => {
    const x = getRandomNumberBetweenMinMax(0, dimensions.width);
    const y = getRandomNumberBetweenMinMax(
      0,
      (dimensions.height * cloudCoverageInPercent) / 100
    );
    return { x, y };
  };

  useEffect(() => {
    if (!ready) return;
    setCloudPosition(getRandomCloudPosition(skyDimensionsInPx));
    setCloudPositionReady(true);
  }, [ready]);

  return [cloudPosition, cloudPositionReady];
};

export default useInitialCloudPosition;
