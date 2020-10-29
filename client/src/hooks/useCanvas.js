import React, { useState, useEffect, useRef } from 'react';
import heartImageSrc from '../assets/heart.png';
import { useKeyPress } from './useKeyPress';

// load image for heart
let heartImage = new Image();
heartImage.src = heartImageSrc;

// Heart constants
const SCALE = 0.4;
const HEART_OFFSET_Y = heartImage.height / 2;
const HEART_OFFSET_X = heartImage.width / 2;

// Canvas constants
export const canvasWidth = window.innerWidth;
export const canvasHeight = window.innerHeight;

// Beat constants
export const BEAT_RADIUS = 20;

export function drawHeart(ctx, location) {
  // ctx.scale(SCALE, SCALE);
  // ctx.translate(location.x + ( SCALE * HEART_OFFSET_X), location.y - (SCALE * HEART_OFFSET_Y));
  ctx.drawImage(
    heartImage,
    location.x - SCALE * HEART_OFFSET_X,
    location.y - SCALE * HEART_OFFSET_Y,
    heartImage.width * SCALE,
    heartImage.height * SCALE
  );
  ctx.restore();
}

function drawBeat(ctx, location) {
  ctx.strokeRect(location.x, location.y, BEAT_RADIUS, BEAT_RADIUS);
  ctx.restore();
}

export function useCanvas() {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);
  const spacePressed = useKeyPress(' ');
  // increment beats
  const incrementBeats = () => {
    let coords = [...coordinates];
    coords.forEach((coord) => {
      coord.y += 0.05;
    });
    setCoordinates(coords);
  };

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawHeart(ctx, { x: canvasWidth / 2, y: canvasHeight / 2 });

    // draw all coordinates held in state
    coordinates.forEach((coordinate) => {
      drawBeat(ctx, coordinate);
    });

    incrementBeats();
  }, []);

  return [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight];
}
