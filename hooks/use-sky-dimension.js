import { useState, useEffect } from "react";
import { debounce } from "throttle-debounce";

const useSkyDimensionsInPx = (props) => {
  const { skyRef, debouncerDelayInMs } = props;
  const [ready, setReady] = useState(false);

  const [skyDimensionsInPx, setSkyDimensionsInPx] = useState({
    width: 0,
    height: 0,
  });

  const getSkyDimensionsInPx = () => {
    const { width, height } = skyRef.current.getBoundingClientRect();
    return { width, height };
  };

  const updateSkyDimensions = debounce(debouncerDelayInMs, () => {
    setSkyDimensionsInPx(getSkyDimensionsInPx());
  });

  useEffect(() => {
    if (skyDimensionsInPx.width !== 0 && skyDimensionsInPx.height !== 0) {
      setReady(true);
    }
  }, [skyDimensionsInPx]);

  useEffect(() => {
    updateSkyDimensions();
    window.addEventListener("resize", updateSkyDimensions);
    return () => window.removeEventListener("resize", updateSkyDimensions);
  }, []);

  return [skyDimensionsInPx, ready];
};

export default useSkyDimensionsInPx;
