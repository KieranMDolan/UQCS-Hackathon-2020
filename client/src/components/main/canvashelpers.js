export function draw(ctx, coordsArr, heartImg, screen) {
  // clear rectangle
  ctx.clearRect(0, 0, screen.width, screen.height);
  // draw heart
  drawHeart(ctx, heartImg);
  // loop through coords and draw beats
};

function drawHeart(ctx, heartImg) {
  ctx.drawImage(heartImg, 100, 100);
}
export function update(coordsArr) {
  // increment y values of beats array
}

export function gameLoop(deltaTime, ctx, coordsArr, heartImg, screen) {
  update(coordsArr);
  // ctx.save();
  draw(ctx, coordsArr, heartImg, screen);
  requestAnimationFrame(gameLoop);
  // ctx.restore();
}