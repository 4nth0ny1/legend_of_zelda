let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.body.style.zoom = "288%";
let fps = 60;
let worldTiles = new Image();
worldTiles.src = "tiles-overworld.png";
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let link1 = new Image();
link1.src = "link.png";
let animationCounter = 0;
let currentAnimation = 0;
let animationSpeed = 10;
let lastButtonPressed = "up";
let linkY = 135;
let linkX = 116;

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
    lastButtonPressed = "left";
  } else if (e.keyCode == 39) {
    rightPressed = true;
    lastButtonPressed = "right";
  } else if (e.keyCode == 38) {
    upPressed = true;
    lastButtonPressed = "up";
  } else if (e.keyCode == 40) {
    downPressed = true;
    lastButtonPressed = "down";
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 40) {
    downPressed = false;
  }
}

function drawLink() {
  let speed = 2;
  animationCounter++;

  if (leftPressed && !collision(linkX - speed, linkY, map7_7)) {
    linkX -= speed;
    if (currentAnimation == 0) {
      ctx.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link1, 30, 30, 16, 16, linkX, linkY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (rightPressed && !collision(linkX + speed, linkY, map7_7)) {
    linkX += speed;
    if (currentAnimation == 0) {
      ctx.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link1, 91, 30, 16, 16, linkX, linkY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (upPressed && !collision(linkX, linkY - speed, map7_7)) {
    linkY -= speed;
    if (currentAnimation == 0) {
      ctx.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link1, 62, 30, 16, 16, linkX, linkY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (downPressed && !collision(linkX, linkY + speed, map7_7)) {
    linkY += speed;
    if (currentAnimation == 0) {
      ctx.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link1, 0, 30, 16, 16, linkX, linkY, 16, 16);
    }
    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else {
    if (lastButtonPressed == "down") {
      ctx.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
    }
    if (lastButtonPressed == "up") {
      ctx.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
    }
    if (lastButtonPressed == "left") {
      ctx.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
    }
    if (lastButtonPressed == "right") {
      ctx.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
    }
  }
}

function collision(x, y, map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] != 2) {
        if (
          x <= j * 16 + 16 &&
          x + 12 >= j * 16 &&
          y + 10 <= i * 16 + 16 &&
          y + 16 >= i * 16
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function drawMap(level) {
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      ctx.drawImage(
        worldTiles,
        (level[i][j] % 18) * 17 + 1,
        Math.floor(level[i][j] / 18) * 17 + 1,
        16,
        16,
        j * 16,
        i * 16,
        16,
        16
      );
    }
  }
}

function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, 256, 240);
    ///all code goes here
    drawMap(map7_7);
    drawLink();
  }, 1000 / fps);
}
draw();
