import { useSpring } from "react-spring";
import { useEffect } from "react";

const useCloudAnimation = (props) => {
  const {
    ref,
    travelDistanceInPx,
    initialPosition,
    animationSpeedInPxPerMs,
    ready,
  } = props;

  const startTranslateXLoop = () => {
    const { width } = ref.current.getBoundingClientRect();
    animation.start({
      config: { duration: getTransitionSpeed(0) },
      from: {
        transform: `translate(-${width}px,${initialPosition.y}px)`,
      },
      to: {
        transform: `translate(${width + travelDistanceInPx}px,${
          initialPosition.y
        }px)`,
      },
      loop: true,
    });
  };

  const getTransitionSpeed = (positionX) => {
    const remainingPx = travelDistanceInPx - positionX;
    return remainingPx / animationSpeedInPxPerMs;
  };

  const [animationStyle, animation] = useSpring(() => ({
    transform: `translate(${initialPosition.x}px,${initialPosition.y}px)`,
    immediate: false,
  }));

  // Does not get updated on window resize (for now)

  useEffect(() => {
    if (!ready) return;
    const { width } = ref.current.getBoundingClientRect();
    animation.start({
      config: { duration: getTransitionSpeed(initialPosition.x) },
      from: {
        transform: `translate(${initialPosition.x}px,${initialPosition.y}px)`,
      },
      to: {
        transform: `translate(${width + travelDistanceInPx}px,${
          initialPosition.y
        }px)`,
      },
      onRest: startTranslateXLoop,
    });
  }, [ready]);

  return animationStyle;
};

export default useCloudAnimation;
