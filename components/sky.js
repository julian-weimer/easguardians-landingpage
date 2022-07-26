import PropTypes from "prop-types";
import { useRef } from "react";
import useSkyDimensionsInPx from "../hooks/use-sky-dimension.js";
import AnimatedCloud from "./animated-cloud.js";

const Sky = (props) => {
  const { debouncerDelayInMs, schema } = props;

  const skyRef = useRef(null);

  const [skyDimensionsInPx, skyDimensionsInPxReady] = useSkyDimensionsInPx({
    skyRef,
    debouncerDelayInMs,
  });

  const generateClouds = () => {
    const clouds = [];
    for (const preset in schema) {
      if (Object.prototype.hasOwnProperty.call(schema, preset)) {
        for (let i = 0; i < schema[preset]; i++) {
          clouds.push(
            <AnimatedCloud
              ready={skyDimensionsInPxReady}
              skyDimensionsInPx={skyDimensionsInPx}
              preset={preset}
            />
          );
        }
      }
    }

    return clouds;
  };

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
      {generateClouds()}
    </div>
  );
};

export default Sky;

Sky.defaultProps = {
  debouncerDelayInMs: 1000,
  schema: {
    background: 7,
    middleground: 2,
    foreground: 3,
  },
};

Sky.propTypes = {
  debouncerDelayInMs: PropTypes.number,
  schema: PropTypes.objectOf(PropTypes.number),
};
