var pencil;
var rotateX = 0;
var rotateY = 0;
var landedX = 0;
var landedY = 0;
var angleThrow = 0;
let angleSpeed = 2;

let spaceDown = false;
let spaceUp = false;

let sliderPower = 0;
let sliderSpeed = 20;
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


let SERVER_URL = "http://127.0.0.1:5000";

let scoreRecorded = false;

function preload() {
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

    createCanvas(1920, 1080);

    angleMode(DEGREES);
    rectMode(CENTER);

    // console.log(query.substring())
    // createCanvas(1920, 1080)
    // updateScores();
}

function draw() {
    // background(0);



    background(255);

    //JUST TESTING WITH SKY GRADIENTS
    currentHeight += testVelocity;
    testVelocity -= 0.5;
    drawSky(currentHeight, MIN_HEIGHT, MAX_HEIGHT);


    drawGround();

    //move the camera away from the plane by a sin wave
    //camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);


    drawPlayer(playerX);

    if (spaceDown || spaceUp) {
        showPowerBar();
    }

    if (spaceUp) {
        pencil.show();
    } else {
        throwAngle();
    }


    //FRAME COUNTER FOR RUNNING ANIMATION
    currentFrame += 0.3;
    if (currentFrame >= 8) {
        currentFrame = 0;
    }

    //MOVE PLAYER 2 PX PER FRAME
    playerX += 2;


}

function showPowerBar() {

    let powerBar = new PowerBar();
    let powerSlider = new PowerSlider();
    // powerSlider.show();
    // ellipse(0, 0, 20, 100);
}

function keyPressed() {
    if (key === " ") {
        spaceDown = true;

    }
}

function keyReleased() {
    if (key === " " && !spaceUp) {
        spaceUp = true;
        spaceDown = false;
        landedX = 0;
        landedY = 0;
        pencil = new Pencil();
        spaceUp = true;
    }

}


function PowerBar() {
    let barStart = width / 2 - 300;
    let barEnd = width / 2 + 300;
    rect(600, 80, 600, 20);

}

function PowerSlider() {

    //go back and forth within the bounds of the slider
    if (sliderPower >= 600) sliderSpeed = -20;
    if (sliderPower <= 0) sliderSpeed = 20;

    //stop slider
    if (spaceUp) {
        console.log(sliderPower);
        sliderSpeed = 0;
    }
    sliderPower += sliderSpeed;
    translate(0, 0);
    rect(300 + sliderPower, 100, 10, 10)


}

function throwAngle() {
    rectMode(CENTER);
    if (angleThrow === 90) angleSpeed = -2;
    if (angleThrow === 0) angleSpeed = 2;
    angleThrow += spaceDown ? 0 : angleSpeed; //stop angle movement when space is held down
    translate(playerX + 18, 730) //follow player
    rotate(angleThrow);
    fill(0);
    rect(0, 0, 20, 100);
}

function Pencil() {
    let angle = angleThrow;
    let power = 100;
    this.x = playerX;
    this.y = 680;
    this.r = 30;

    //x and y velocities based on angle and power
    this.xSpeed = power * sin(angle) * 0.4;
    this.ySpeed = power * cos(angle) * -1 * 0.4;

    this.gravity = 1;

    this.show = function () {

        //move based on calculated trajectory
        translate(this.x, this.y);

        //rotate based on tangent line of current point on the curve
        rotate(-1 * atan((landedX ? landedX : this.xSpeed) / (landedY ? landedY : this.ySpeed)));

        rect(0, 0, 20, 100);


        this.ySpeed += this.gravity;
        this.y += this.ySpeed;
        this.x += this.xSpeed;

        if (this.y >= height - 10) { //if landed
            this.y = height - 10;

            //set landed coordinates to keep pencil at
            landedX = landedX ? landedX : this.xSpeed;
            landedY = landedY ? landedY : this.ySpeed;
            this.xSpeed = 0;
            console.log(landedX);
            noLoop();
            updateScores();
            this.stop();
        }
        else {
            rotateX = this.xSpeed;
            rotateY = this.ySpeed;

        }
    }
}

function drawPlayer(x) {
    image(runAnimation[Math.floor(currentFrame)], x, 680, 200, 200);
}

function drawSky(currentHeight, minHeight, maxHeight) {
    let interLight = map(currentHeight, minHeight, maxHeight, 0, 1);
    let interDark = map(currentHeight + 0.1 * (maxHeight - minHeight), minHeight, maxHeight, 0, 1);
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
    fill(color(0, 153, 0));
    rectMode(CORNER);
    rect(0, 880, width, height - 880);
}

function updateScores() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL + "/UpdateScores",
        crossDomain: true,
        success: function (res) {
            scoreRecorded = true;
        }
    })

}





function getQueryStringParams() {
    let query = window.location.search;

    let nicknameSearch = "&nickname=";
    let characterSearch = "&character=";
    let avatarSearch = "&avatar=";

    let nicknameIndex = query.indexOf(nicknameSearch);
    let characterIndex = query.indexOf(characterSearch);
    let avatarIndex = query.indexOf(avatarSearch);

    let nickname = query.substring(nicknameIndex + nicknameSearch.length, characterIndex).replace("%", " ");
    let character = query.substring(characterIndex + characterSearch.length, avatarIndex).replace("%", " ");
    let avatar = query.substring(avatarIndex + avatarSearch.length, query.length)

    console.log(nickname);
    console.log(character);
    console.log(avatar);
}