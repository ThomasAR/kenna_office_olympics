//GAME SETTINGS
var PLAYER_VELOCITY = 4;
var GRAVITY = 0.5;
var POWER_MULTIPLIER = 0.4;

var MIN_HEIGHT = 0;
var MAX_HEIGHT = 10000;
//END GAME SETTINGS





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
var playerX = 500;
var MAX_COLOR;
var MIN_COLOR;


var PLAYER_STATE;
var throwFrame = 0;
const Y_AXIS = 1;
const X_AXIS = 2;

var MAX_COLOR;
var MIN_COLOR;

var currentHeight = 0;

var avatar;
var character;
var nickname;
var headImage;

var testVelocity = 25;

var cam;

var releasePower = 0;


var pencilDX = 0;
var pencilDY = 0;

var scoreFont;

function preload() {
    getQueryStringParams();

    if(avatar) {
        headImage = loadImage('../resources/staff/'+avatar);
    }
    else {
        headImage = loadImage('../resources/staff/Staff_Michael_Sansone_Adjust.png');
    }


    scoreFont = loadFont('../resources/Neucha-Regular.ttf');



    pencilImage = loadImage('../resources/pencil.png');
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
    cam = new Camera();
    angleMode(DEGREES);
    rectMode(CENTER);

    PLAYER_STATE = 0;
    // console.log(query.substring())
    // createCanvas(1920, 1080)

}

function draw() {


    drawSky();
    push();
    drawGround();
    drawPlayer();

    if (spaceDown || spaceUp) {
        showPowerBar();
    }

    if (spaceUp) {
        pencil.show();
        pop();
        drawScore();
    } else {
        throwAngle();
    }

    
    //FIRST PARAM: isInPlayersHand, PENCIL MECHANICS CHANGE WHEN NOT IN PLAYERS HAND OBVIOUSLY, I.E. ON RELEASE OF SPACE BAR THIS WOULD BECOME FALSE.
    // drawPencil(true, playerX);

    //FRAME COUNTER FOR RUNNING ANIMATION
    currentFrame += 0.3;
    if (currentFrame >= 8) {
        currentFrame = 0;
    }


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
        PLAYER_STATE = 1;
    }

}


function PowerBar() {

    strokeWeight(1);
    setGradient(width / 2 - 300,80,150,40,color(255,0,0),color(255,188,0), X_AXIS);
    setGradient(width / 2 - 150,80,150,40,color(255,188,0),color(46,199,0), X_AXIS);
    setGradient(width / 2,80,150,40,color(46,199,0),color(255,188,0), X_AXIS);
    setGradient(width / 2 + 150,80,150,40,color(255,188,0),color(255,0,0), X_AXIS);
    stroke(0);
    strokeWeight(3);
    noFill();
    rect(width / 2 - 300, 80, 200, 40);
    rect(width / 2 - 100, 80, 200, 40);
    rect(width / 2 + 100, 80, 200, 40);

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
    fill(0);
    triangle(width/2-300 + sliderPower, 130, width/2-300+20 + sliderPower, 165, width/2-300-20+sliderPower, 165);

    if(sliderPower >= 300) {
        releasePower = 600 - sliderPower;
    }
    else{
        releasePower = sliderPower;
    }
    

}

function throwAngle() {
    imageMode(CENTER);
    if (angleThrow === 90) angleSpeed = -2;
    if (angleThrow === 0) angleSpeed = 2;
    angleThrow += spaceDown ? 0 : angleSpeed; //stop angle movement when space is held down
    translate(playerX + 18, 730) //follow player
    cam.translate(1000, 0);
    rotate(angleThrow);
    fill(0);
    image(pencilImage, 0, 0, 10, 100);
    imageMode(CORNER);
}

function Pencil() {
    let angle = angleThrow;
    let power = releasePower;
    this.x = playerX;
    this.y = 680;
    this.r = 30;

    //x and y velocities based on angle and power
    this.xSpeed = power * sin(angle) * POWER_MULTIPLIER;
    this.ySpeed = power * cos(angle) * -1 * POWER_MULTIPLIER;

    this.gravity = GRAVITY;

    this.show = function () {

        //move based on calculated trajectory
        translate(this.x, this.y);

        //rotate based on tangent line of current point on the curve
        var rotation = -1 * atan((landedX ? landedX : this.xSpeed) / (landedY ? landedY : this.ySpeed));

        rotate(rotation < 0 ? 90 + (90 - Math.abs(rotation)) : rotation);
        imageMode(CENTER);
        image(pencilImage, 0, 0, 10, 100);
        imageMode(CORNER);


        this.ySpeed += this.gravity;
        //this.y += this.ySpeed;
        //this.x += this.xSpeed;
        pencilDY -= this.ySpeed;
        pencilDX -= this.xSpeed;
        if (pencilDY < -170) { //if landed
            pencilDY = -170;
            pop();
            drawGround();
            //set landed coordinates to keep pencil at
            landedX = landedX ? landedX : this.xSpeed;
            landedY = landedY ? landedY : this.ySpeed;
            this.xSpeed = 0;
            console.log(-pencilDX);
            noLoop();
            endGame();
        }
        else {
            rotateX = this.xSpeed;
            rotateY = this.ySpeed;

        }
    }
}

function drawPlayer() {
    
    //DRAW BODY
    switch (PLAYER_STATE) {
        case 0:
            image(runAnimation[Math.floor(currentFrame)], playerX + pencilDX, 680 + pencilDY, 200, 200);
            break;
        case 1:
            image(throwAnimation[Math.floor(throwFrame)], playerX + pencilDX, 680 + pencilDY, 200, 200);
            throwFrame+=1;
            if(throwFrame >= 3) {
                PLAYER_STATE = 2;
            }
            break;
        case 2:
            image(throwAnimation[3], playerX + pencilDX, 680 + pencilDY, 200, 200);
            break;
    }
    //DRAW HEAD
    image(headImage, playerX +45 + pencilDX, 695+2*sin(map(currentFrame, 0, 8, 0, 360)) + pencilDY, 65,75);

    //MOVE PLAYER
    switch(PLAYER_STATE) {
        case 0: //RUNNING
            //playerX += PLAYER_VELOCITY;
            break;
        case 1: //THROWING
            PLAYER_VELOCITY -= 0.5;
            if(PLAYER_VELOCITY < 0) {
                PLAYER_VELOCITY = 0;
            }
            //              playerX += PLAYER_VELOCITY;
            break;
        case 2: //STATIONARY
            //DO NOTHING
            break;
    }
}

function drawSky() {
    //JUST TESTING WITH SKY GRADIENTS
    

    let interLight = map(pencilDY, MIN_HEIGHT, MAX_HEIGHT, 0, 1);
    let interDark = map(pencilDY + 0.1 * (MAX_HEIGHT - MIN_HEIGHT), MIN_HEIGHT, MAX_HEIGHT, 0, 1);
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
    noStroke();
    fill(color(0, 128, 0));
    rectMode(CORNER);
    rect(0, 880 + pencilDY, width, height);
}


function drawScore() {
    
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(100);
    fill(255);
    stroke(0);
    strokeWeight(5);
    textFont(scoreFont);
    text((-pencilDX/10).toFixed(1) + " m", width/2, 300)
}


function endGame() {
    //TODO: APPEND SCORE TO SCORES
    var position = 1;

    //TODO: SET VALUES IN END SCREEN
    $('#Score').html((-pencilDX/10).toFixed(1) + " m");
    $('#position').html(position);
    $('#ordinal').html(ordinal_suffix_of(position));
    setTimeout(function() {
        $('#EndScreen').fadeIn();
      }, 1000);
}


function getQueryStringParams() {
    let query = window.location.search;

    let nicknameSearch = "&nickname=";
    let characterSearch = "&character=";
    let avatarSearch = "&avatar=";

    let nicknameIndex = query.indexOf(nicknameSearch);
    let characterIndex = query.indexOf(characterSearch);
    let avatarIndex = query.indexOf(avatarSearch);

    nickname = query.substring(nicknameIndex + nicknameSearch.length, characterIndex).replace("%", " ");
    character = query.substring(characterIndex + characterSearch.length, avatarIndex).replace("%", " ");
    avatar = query.substring(avatarIndex + avatarSearch.length, query.length)

    console.log(nickname);
    console.log(character);
    console.log(avatar);
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}