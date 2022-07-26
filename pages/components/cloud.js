import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const Cloud = (props) => {
  const { skyDimensionsInPx, initialPosition, animationSpeedInPxPerMs } = props;

  const cloudRef = useRef(null);

  const startTransitionXLoop = () => {
    const { width } = cloudRef.current.getBoundingClientRect();
    translateXAnimation.start({
      config: { duration: getTransitionSpeed(0) },
      from: {
        transform: `translate(-${width}px, ${initialPosition.y}px)`,
      },
      to: {
        transform: `translate(${width + skyDimensionsInPx.width}px, ${
          initialPosition.y
        }px)`,
      },
      loop: true,
    });
  };

  const getTransitionSpeed = (positionX) => {
    const remainingPx = skyDimensionsInPx.width - positionX;
    return remainingPx / animationSpeedInPxPerMs;
  };

  const [translateXStyle, translateXAnimation] = useSpring(() => ({
    transform: `translate(${initialPosition.x}px, ${initialPosition.y}px)`,
    immediate: false,
    onRest: startTransitionXLoop,
  }));

  useEffect(() => {
    if (skyDimensionsInPx.width === 0) return;
    const { width } = cloudRef.current.getBoundingClientRect();
    translateXAnimation.start({
      config: { duration: getTransitionSpeed(initialPosition.x) },
      transform: `translate(${width + skyDimensionsInPx.width}px, ${
        initialPosition.y
      }px)`,
    });
  }, [skyDimensionsInPx.width]);

  return (
    <animated.div
      ref={cloudRef}
      css={{
        background: "url(/cloud.svg) center center no-repeat",
        height: "200px",
        width: "300px",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      style={translateXStyle}
    />
  );
};

export default Cloud;

Cloud.defaultProps = {
  animationSpeedInPxPerMs: 0.01,
};

Cloud.propTypes = {
  skyDimensionsInPx: PropTypes.objectOf(PropTypes.number),
  animationSpeedInPxPerMs: PropTypes.number,
  initialPosition: PropTypes.objectOf(PropTypes.number),
};
