import PropTypes from "prop-types";
import { animated } from "react-spring";
import React, { useState, useEffect } from "react";
import { getRandomNumberBetweenMinMax } from "../common/helper.js";

const Cloud = React.forwardRef((props, ref) => {
  const { style, visible, presets, preset, fadeInTimeInMs } = props;

  const { dimensions, opacityRange, layerCountRange, layerSizeRangeInPercent } =
    presets[preset];

  const generateLayersSchema = () => {
    const schema = [];

    const layerCount = Math.round(
      getRandomNumberBetweenMinMax(layerCountRange[0], layerCountRange[1])
    );

    for (let i = 0; i < layerCount; i++) {
      const height =
        (getRandomNumberBetweenMinMax(
          layerSizeRangeInPercent[0],
          layerSizeRangeInPercent[1]
        ) *
          dimensions.height) /
        100;
      const width =
        (getRandomNumberBetweenMinMax(
          layerSizeRangeInPercent[0],
          layerSizeRangeInPercent[1]
        ) *
          dimensions.width) /
        100;

      const left = getRandomNumberBetweenMinMax(0, dimensions.width - width);
      const top = getRandomNumberBetweenMinMax(0, dimensions.width - height);

      const opacity = getRandomNumberBetweenMinMax(
        opacityRange[0],
        opacityRange[1]
      );

      schema.push({
        height,
        width,
        left,
        top,
        opacity,
      });
    }

    return schema;
  };

  const [layersSchema, setLayersSchema] = useState([]);

  useEffect(() => {
    setLayersSchema(generateLayersSchema());
  }, []);

  const generateLayers = () => {
    const layers = [];

    for (const { height, width, left, top, opacity } of layersSchema) {
      layers.push(
        <div
          style={{
            background: "url(/cloud.svg) center center no-repeat",
            height,
            left,
            opacity,
            position: "absolute",
            top,
            width,
          }}
        />
      );
    }

    return layers;
  };

  return (
    layersSchema.length > 0 && (
      <animated.div
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: dimensions.height,
          width: dimensions.width,
          transition: `opacity ${fadeInTimeInMs}ms ease-in-out`,
          opacity: visible ? 1 : 0,
          ...style,
        }}
      >
        {generateLayers()}
      </animated.div>
    )
  );
});

export default Cloud;

Cloud.defaultProps = {
  style: {},
  visible: false,
  preset: "foreground",
  presets: {
    foreground: {
      layerCountRange: [4, 6],
      dimensions: { width: 500, height: 300 },
      opacityRange: [0, 0.08],
      layerSizeRangeInPercent: [50, 90],
    },
    background: {
      layerCountRange: [1, 2],
      dimensions: { width: 200, height: 100 },
      opacityRange: [0, 0.1],
      layerSizeRangeInPercent: [20, 90],
    },
    middleground: {
      layerCountRange: [4, 6],
      dimensions: { width: 300, height: 250 },
      opacityRange: [0, 0.4],
      layerSizeRangeInPercent: [10, 90],
    },
  },
  fadeInTimeInMs: 1000,
};

Cloud.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
  presets: PropTypes.object,
  preset: PropTypes.string,
  fadeInTimeInMs: PropTypes.number,
};
