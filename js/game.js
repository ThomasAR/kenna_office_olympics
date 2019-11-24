var ball;
var rotateX = 0;
var rotateY = 0;
var landedX = 0;
var landedY = 0;
var angleThrow = 0;
let angleSpeed = 2;

let spaceDown = false;
let spaceUp = false;

function setup() {

    angleMode(DEGREES);
    rectMode(CENTER);

    // console.log(query.substring())
    createCanvas(1920, 1080)
}

function draw() {
	background(0);
		
	if(spaceDown || spaceUp){
		showPowerBar();
	}

    if (spaceUp) {
		ball.show();
	} else {
		throwAngle();
	}



}

function throwAngle() {
	if(angleThrow === 90) angleSpeed = -2;
	if(angleThrow === 0) angleSpeed = 2;
	angleThrow += angleSpeed;
	translate(80, 1000)
	rotate(angleThrow);
	rect(0, 0, 20, 100);
}

function showPowerBar() {
	if(spaceUp === false){

		let powerBar = new PowerBar();
	// ellipse(0, 0, 20, 100);
	}
}

function keyPressed() {
	if(key === " "){
		spaceDown = true;
	}
}

function keyReleased() {
	if(key === " " && !spaceUp){
		spaceUp = true;
		spaceDown = false;
		landedX = 0;
		landedY = 0;
		ball = new Ball();
		spaceUp = true;
	}

}
function PowerBar() {
	let barStart = width / 2 - 300;
	let barEnd = width / 2 + 300;
	this.x = 400;
	this.y = 400;
	rect(barStart, 80, barEnd - barStart, 20);
}

function Ball() {
	let angle = angleThrow;
	console.log(angleThrow);
    let power = 100;
    this.x = 80;
    this.y = 1000;
    this.r = 30;

    this.xSpeed = power * sin(angle) * 0.4;
    this.ySpeed = power * cos(angle) * -1 * 0.4;

    this.gravity = 1;

    this.show = function () {

		translate(this.x, this.y);
		rotate(-1 * atan((landedX ? landedX : this.xSpeed) / (landedY ? landedY : this.ySpeed)));

        rect(0, 0, 20, 100);


        this.ySpeed += this.gravity;
        this.y += this.ySpeed;
		this.x += this.xSpeed;

        if (this.y >= height - 10) {
			this.y = height - 10;
			landedX = landedX ? landedX : this.xSpeed;
			landedY = landedY ? landedY : this.ySpeed;	
			this.xSpeed = 0;
			console.log(landedX);
			noLoop();
        }
        else {
            rotateX = this.xSpeed;
            rotateY = this.ySpeed;

		}
    }
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