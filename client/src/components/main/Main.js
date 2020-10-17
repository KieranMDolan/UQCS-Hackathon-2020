import React, { useEffect, useRef } from 'react';
import heartImageSrc from '../../assets/heart.png';
import { useKeyPress } from '../../hooks/useKeyPress';

// load image for heart
let heartImage = new Image();
heartImage.src = heartImageSrc;

// Heart constants
const SCALE = 0.2;
const HEART_OFFSET_Y = heartImage.height / 2;
const HEART_OFFSET_X = heartImage.width / 2;

// Beat constants
const BEAT_RADIUS = 20;
let INCREMENT_SIZE = 4;

// Canvas constants
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const screenWH = { width: canvasWidth, height: canvasHeight };

// scoring range constants
const START_RANGE = canvasHeight / 2 - SCALE * HEART_OFFSET_Y;
const END_RANGE = canvasHeight / 2 + SCALE * HEART_OFFSET_Y;

// scoring variables
let comboCount = 0;
let comboMax = 30;
let scoreFactor = 1;
let score = 0;

// helper random function
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// function to fill beat coordinates with dummy data
const getBeatsArr = () => {
  const X_POINT = canvasWidth / 2 - BEAT_RADIUS / 2;
  let yPoint = 0;
  let coordArr = [];
  for (let i = 0; i < 200; i++) {
    coordArr.push({ x: X_POINT, y: yPoint, hittable: true, shouldDraw: true });
    yPoint -= randomIntFromInterval(30, 100);
  }
  coordArr.reverse();
  return coordArr;
};

let beatCoordsArr = getBeatsArr();
let TRACKED_INDEX = beatCoordsArr.length - 1;

const Main = () => {
  let spacePressed = useKeyPress(' ');
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
      // draw combo count
      drawComboCount();
      drawScore();
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
        if (beat.shouldDraw) {
          ctx.strokeRect(beat.x, beat.y, 20, 20);
        }
      });
    }

    function drawComboCount() {
      ctx.font = '48px Verdana';
      ctx.fillText(
        'x' + comboCount,
        canvasWidth / 2 + SCALE * HEART_OFFSET_X - 30,
        canvasHeight / 2 - SCALE * HEART_OFFSET_Y + 30
      );
    }

    function drawScore() {
      ctx.font = '64px Verdana';
      ctx.fillText(score, canvasWidth / 2, 100);
    }

    function update() {
      beatCoordsArr.forEach((beat) => {
        beat.y += INCREMENT_SIZE;
        if (beat.y > END_RANGE && beat.hittable) {
          comboCount = 0;
          beat.hittable = false;
          TRACKED_INDEX--;
        }
        if (beat.y > canvasHeight) {
          beat.shouldDraw = false;
        }
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

  const increaseScore = () => {
    let toAdd;
    if (comboCount === 0) {
      toAdd = 1 * scoreFactor;
    } else {
      toAdd = 1 * scoreFactor * comboCount;
    }
    score += toAdd;
  };

  const increaseComboCount = () => {
    if (comboCount < comboMax) {
      comboCount++;
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === ' ' && beatCoordsArr.length !== 0) {
      let y = beatCoordsArr[TRACKED_INDEX].y;
      // change to tracked index
      if (y >= START_RANGE && y <= END_RANGE) {
        increaseScore();
        increaseComboCount();
        beatCoordsArr[TRACKED_INDEX].shouldDraw = false;
        beatCoordsArr[TRACKED_INDEX].hittable = false;
        TRACKED_INDEX--;
      } else {
        comboCount = 0;
      }
    }
  };

  return (
    <canvas
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      // onClick={handleCanvasClick}
      tabIndex={0}
      onKeyPress={handleKeyPress}
    />
  );
};

export default Main;
