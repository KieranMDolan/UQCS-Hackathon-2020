import React, { useState, useEffect } from "react";
import { Stage, Sprite } from "@inlet/react-pixi";
import heartSprite from "../../assets/heart.png";

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;
const HEART_X = STAGE_WIDTH / 2;
const HEART_Y = (STAGE_HEIGHT * 3) / 5;
const HEART_SCALE_BASE = 0.4;
const HEART_SCALE_EXPANDED = 0.6;
const BACKGROUND_COLOUR = 0xeef1f5;
let hasExpanded = false;


const Main = (props) => {
  const [scale, setScale ] = useState(HEART_SCALE_BASE);

  useEffect(() => {
    if (hasExpanded) {
      hasExpanded = false;
      setTimeout(() => {
        setScale(HEART_SCALE_BASE);
      }, 150)
    }
  }, [scale]);

  const onHeartPress = () => {
    console.log("pressed");
    hasExpanded = true;
    setScale(HEART_SCALE_EXPANDED);

  };
  return (
    <Stage
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      options={{ backgroundColor: BACKGROUND_COLOUR }}
    >
      <Sprite
        image={heartSprite}
        scale={scale}
        anchor={0.5}
        x={HEART_X}
        y={HEART_Y}
        interactive={true}
        pointerdown={() => {
          onHeartPress(hasExpanded);
        }}
      />
    </Stage>
  );
};

export default Main;
