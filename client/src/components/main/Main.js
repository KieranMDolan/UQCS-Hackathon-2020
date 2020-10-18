import React, { useEffect, useRef } from 'react';
import { SERVER } from '../../appconstants';

// load image for heart
let heartImage = new Image();
heartImage.src = `${SERVER}images/heart.png`;

// Heart constants
const SCALE = 0.3;
const HEART_OFFSET_Y = heartImage.height / 2;
const HEART_OFFSET_X = heartImage.width / 2;

// Beat constants
const BEAT_RADIUS = 20;
let INCREMENT_SIZE = 4;

// Canvas constants
const canvasWidth = window.innerWidth / 2;
const canvasHeight = window.innerHeight / 1.1;
const screenWH = { width: canvasWidth, height: canvasHeight };

// scoring range constants
const START_RANGE = canvasHeight / 2 - SCALE * HEART_OFFSET_Y;
const END_RANGE = canvasHeight / 2 + SCALE * HEART_OFFSET_Y;

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

const Main = (props) => {
  const canvasRef = useRef(null);

  // game loop functionality
  useEffect(() => {
    // document.addEventListener("keydown", handleKeyPress);
    // console.log("Startup func");
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
      // drawComboCount();
      // drawScore();
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

    function update() {
      beatCoordsArr.forEach((beat) => {
        beat.y += INCREMENT_SIZE;
        if (beat.y > END_RANGE && beat.hittable) {
          props.setScore({ ...props.score, comboCount: 0})
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
    if (props.score.comboCount === 0) {
      toAdd = props.score.baseScore * props.score.scoreFactor;
    } else {
      toAdd = props.score.baseScore * props.score.scoreFactor * props.score.comboCount;
    }
    props.setJoules(props.joules + toAdd);
  };

  const increaseComboCount = () => {
    if (props.score.comboCount < props.score.comboMax) {
      props.setScore({...props.score, comboCount: props.score.comboCount + 1});
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
        props.setScore({ ...props.score, comboCount: 0});
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
