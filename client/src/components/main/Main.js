import React, { useEffect, useRef } from 'react';
import { SERVER } from '../../appconstants';

// load image for heart
let heartImage = new Image();
let beatImage = new Image();
heartImage.src = `${SERVER}images/heart.png`;
beatImage.src = `${SERVER}images/Beat.png`;

// Heart constants
const SCALE = 0.3;
const HEART_OFFSET_Y = heartImage.height / 2;
const HEART_OFFSET_X = heartImage.width / 2;

// Beat constants
const BEAT_RADIUS = 20;
let INCREMENT_SIZE = 4;

// Canvas constants
const canvasWidth = window.innerWidth / 2;
const canvasHeight = window.innerHeight / 1.4;
const screenWH = { width: canvasWidth, height: canvasHeight };

// scoring range constants
const START_RANGE = canvasHeight / 2 - SCALE * HEART_OFFSET_Y;
const END_RANGE = canvasHeight / 2 + SCALE * HEART_OFFSET_Y;

const PI = Math.PI;

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
    document.addEventListener("keydown", handleKeyPress); //This is effectly an async action, occurs separate from reacts render loop, therefore, all setState operations must account for async updates
    const canvasObj = canvasRef.current;
    let ctx = canvasObj.getContext('2d');
    function draw() {
      // clear rectangle
      ctx.clearRect(0, 0, screenWH.width, screenWH.height);
      // draw heart
      drawHeart();
      // loop through coords and draw beats
      drawBeats();

      drawSinc();
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
          ctx.drawImage(beatImage, beat.x, beat.y, 20, 20);
        }
      });
    }

    function drawSinc() {
      ctx.beginPath();
      const samples = 200;
      const samplingPeriod = 2 * PI / samples;
      const SCALAR = 10;
      let x = 0, y = 0;
      for (let i = 0; i < samples; i++) {
        ctx.moveTo(x * SCALAR, y * SCALAR); //Move to the last x,y pos
        x = i * samplingPeriod;
        y = Math.sin(x);//Goes from 0 to 1
        ctx.lineTo(x * SCALAR, y * SCALAR);
        ctx.stroke();
      }
      ctx.closePath();
    }

    function update() {
      beatCoordsArr.forEach((beat) => {
        beat.y += INCREMENT_SIZE;
        if (beat.y > END_RANGE && beat.hittable) {
          props.setScore({ ...props.score, comboCount: 0 })
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
    console.log({ toAdd });
    props.setJoules(prevjoules => prevjoules + toAdd);
  };

  const increaseComboCount = () => {
    props.setScore(prevScore => {
      return (prevScore.comboCount < prevScore.comboMax) ? { ...prevScore, comboCount: prevScore.comboCount + 1 } : null //React 16 allows no state update if null returned
    });
  }

  const handleKeyPress = (event) => {
    console.log("Handling press", event)
    if (event.key === ' ' && beatCoordsArr.length !== 0) {
      event.preventDefault();
      console.log("in press")
      let y = beatCoordsArr[TRACKED_INDEX].y;
      // change to tracked index
      if (y >= START_RANGE && y <= END_RANGE) {
        increaseScore();
        increaseComboCount();
        beatCoordsArr[TRACKED_INDEX].shouldDraw = false;
        beatCoordsArr[TRACKED_INDEX].hittable = false;
        TRACKED_INDEX--;
      } else {
        props.setScore({ ...props.score, comboCount: 0 });
      }
    }
  };

  return (
    <canvas
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      tabIndex={0}
    // onKeyPress={handleKeyPress}
    />
  );
};

export default Main;
