function setup() {
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


    // console.log(query.substring())
}

function draw() {
    ellipse(50, 50, 80, 80);
}

function getQueryStringParams() {

}