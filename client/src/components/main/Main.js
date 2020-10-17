import React, { useEffect, useRef } from 'react';
import heartImageSrc from '../../assets/heart.png';

// load image for heart
let heartImage = new Image();
heartImage.src = heartImageSrc;

// Heart constants
const SCALE = 0.4;
const HEART_OFFSET_Y = heartImage.height / 2;
const HEART_OFFSET_X = heartImage.width / 2;

// Beat constants
const BEAT_RADIUS = 20;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const screenWH = { width: canvasWidth, height: canvasHeight };

// function to fill beat coordinates with dummy data
const getBeatsArr = () => {
  const X_POINT = canvasWidth / 2 - BEAT_RADIUS / 2;
  let yPoint = 0;
  let coordArr = [];
  for (let i = 0; i < 20; i++) {
    coordArr.push({ x: X_POINT, y: yPoint });
    yPoint -= 100;
  }
  coordArr.reverse();
  return coordArr;
};

let beatCoordsArr = getBeatsArr();

const Main = () => {
  const canvasRef = useRef(null);

  // game loop functionality
  useEffect(() => {
    const canvasObj = canvasRef.current;
    let ctx = canvasObj.getContext('2d');

    function draw() {
      // clear rectangle
      ctx.clearRect(0, 0, screenWH.width, screenWH.height);
      // draw heart
      drawHeart();
      // loop through coords and draw beats
      drawBeats();
    }

    function drawHeart() {
      ctx.drawImage(
        heartImage,
        canvasWidth / 2 - SCALE * HEART_OFFSET_X,
        canvasHeight / 2 - SCALE * HEART_OFFSET_Y,
        heartImage.width * SCALE,
        heartImage.height * SCALE
      );
    }

    function drawBeats() {
      beatCoordsArr.forEach((beat) => {
        ctx.strokeRect(beat.x, beat.y, 20, 20);
      });
    }

    function update() {
      beatCoordsArr.forEach((beat) => {
        beat.y += 1;
      });
    }

    function gameLoop() {
      update();
      // ctx.save();
      draw();
      requestAnimationFrame(gameLoop);
      // ctx.restore();
    }

    gameLoop();
  }, []);

  return (
    <canvas
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      // onClick={handleCanvasClick}
      tabIndex={0}
      // onKeyPress={handleKeyPress}
    />
  );
};

export default Main;
