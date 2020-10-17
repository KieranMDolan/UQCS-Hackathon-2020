import React, { useEffect } from 'react';
import { useCanvas, BEAT_RADIUS } from '../../hooks/useCanvas';
import { useKeyPress } from '../../hooks/useKeyPress';

const BEATS_PER_MINUTE = 120;
const INCREMENT_SIZE = 1;

const Main = () => {
  const [
    coordinates,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
  ] = useCanvas();

  // fill beat coordinates
  const fillBeats = () => {
    const X_POINT = canvasWidth / 2 - BEAT_RADIUS / 2;
    let yPoint = 0;
    let coordArr = [];
    for (let i = 0; i < 20; i++) {
      coordArr.push({ x: X_POINT, y: yPoint });
      yPoint -= 100;
    }
    setCoordinates(coordArr);
  };

  // run when component mounts to fill coordinates state with beats
  useEffect(() => {
    fillBeats();
  }, []);

  const handleCanvasClick = (event) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    console.log(currentCoord);
    // setCoordinates([...coordinates, currentCoord]);
  };

  return (
    <canvas
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={handleCanvasClick}
    />
  );
};

export default Main;
