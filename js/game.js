var ball;
var clicked = false;
var rotateX = 0;
var rotateY = 0;
function setup() {

    angleMode(DEGREES);
    rectMode(CENTER);

    // console.log(query.substring())
    createCanvas(1920, 1080)
}

function draw() {
    background(0);

    if (clicked) {
        ball.show();
    }

}

function mouseClicked() {

    ball = new Ball();
    clicked = true;
}

function Ball() {
    let angle = 25;
    let power = 100;
    this.x = 80;
    this.y = 1000;
    this.r = 30;

    this.xSpeed = power * sin(angle) * 0.4;
    this.ySpeed = power * cos(angle) * -1 * 0.4;

    this.gravity = 1;

    this.show = function () {
        ellipse(this.x, this.y, this.r * 2, this.r * 2);


        this.ySpeed += this.gravity;
        this.y += this.ySpeed;
        this.x += this.xSpeed;

        rotate(80, 80, -1 * atan(this.xSpeed / this.ySpeed))
        rect(80, 80, 10, 100);

        if (this.y >= height - 10) {
            this.y = height - 10;
            this.xSpeed = 0;
        }
        else {
            rotateX = this.xSpeed;
            rotateY = this.ySpeed;
            console.log(this.xSpeed, this.ySpeed);

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