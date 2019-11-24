var currentFrame = 0;
var runAnimation = [];
var throwAnimation = [];
var playerX = 200;

const Y_AXIS = 1;
const X_AXIS = 2;

var MAX_COLOR;
var MIN_COLOR;
var MIN_HEIGHT = 0;
var MAX_HEIGHT = 1000;
var currentHeight = 0;

var testVelocity = 25;
function preload()  {
    runAnimation.push(loadImage('../resources/animations/run/run-01.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-02.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-03.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-04.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-05.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-06.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-07.png'));
    runAnimation.push(loadImage('../resources/animations/run/run-08.png'));

    throwAnimation.push(loadImage('../resources/animations/throw/throw-01.png'));
    throwAnimation.push(loadImage('../resources/animations/throw/throw-02.png'));
    throwAnimation.push(loadImage('../resources/animations/throw/throw-03.png'));
    throwAnimation.push(loadImage('../resources/animations/throw/throw-04.png'));
}

function setup() {
    //MIN AND MAX (LIGHTEST AND DARKEST COLORS FOR SKY)
    MAX_COLOR = color(0, 0, 102);
    MIN_COLOR = color(204, 255, 255);

    createCanvas(1000, 700);
    angleMode(DEGREES);

}

function draw() {
    background(255);

    //JUST TESTING WITH SKY GRADIENTS
    currentHeight+=testVelocity;
    testVelocity -= 0.5;
    drawSky(currentHeight, MIN_HEIGHT, MAX_HEIGHT);
    
    
    drawGround();
   
    //move the camera away from the plane by a sin wave
    //camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);

    
    drawPlayer(playerX);
    //FIRST PARAM: isInPlayersHand, PENCIL MECHANICS CHANGE WHEN NOT IN PLAYERS HAND OBVIOUSLY, I.E. ON RELEASE OF SPACE BAR THIS WOULD BECOME FALSE.
    drawPencil(true, playerX);

    //FRAME COUNTER FOR RUNNING ANIMATION
    currentFrame+=0.3;
    if(currentFrame >= 8) {
        currentFrame = 0;
    }

    //MOVE PLAYER 2 PX PER FRAME
    playerX+=2;
}


function drawPlayer(x) {
    image(runAnimation[Math.floor(currentFrame)], x, 400, 200, 200);
    
}

function drawPencil(isInPlayersHand, playerX) {
    rectMode(CENTER);
    if(isInPlayersHand) {
        translate(playerX+18, 450);
        rotate(45);
        fill(0);
        rect(0, 0, 10, 100);
        
    }
}

function drawSky(currentHeight, minHeight, maxHeight) {
    let interLight = map(currentHeight, minHeight, maxHeight, 0, 1);
    let interDark = map(currentHeight + 0.1*(maxHeight-minHeight), minHeight, maxHeight, 0, 1);
    var light = lerpColor(MIN_COLOR, MAX_COLOR, interLight);
    var dark = lerpColor(MIN_COLOR, MAX_COLOR, interDark);

    setGradient(0, 0, width, height, dark, light, Y_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }

  function drawGround() {
    fill(color(0,153,0));
    rectMode(CORNER);
    rect(0, 600, width, height-600);
  }