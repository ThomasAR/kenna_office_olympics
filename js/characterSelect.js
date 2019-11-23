let imagePath = "../resources/staff/";
let selectedCharacter = {
    "firstName": "Jeffrey",
    "lastName": "Bowles",
    "image": "http:\/\/kenna.ca\/wp-content\/uploads\/2016\/09\/Leadership__0006_Leadership_Jeff_Bowles_Adjust.jpg",
    "avatar": "Leadership__0006_Leadership_Jeff_Bowles_Adjust.png"
};

$(document).ready(function () {
    let characters = "";
    $.getJSON('../src/characters.json', function (res) {
        characters = res;
        populateCharacters(characters);
    });

    $("#searchCharacters").on("input propertychange", function (e) {
        let value = $(this).val().toLowerCase();
        populateCharacters(characters.filter(function (c) {
            return c.firstName.toLowerCase().indexOf(value) > -1 || c.lastName.toLowerCase().indexOf(value) > -1
        }))
    });

    $("#playButton").click(function (e) {
        let nickname = $("#nickname").val().replace(' ', '%');
        let name = selectedCharacter.firstName + '%' + selectedCharacter.lastName;
        console.log("&nickname=" + nickname + "&name=" + name);
    })



})

let populateCharacters = (characters) => {
    let characterSelect = $("#characterSelect");
    characterSelect.empty();
    characters.forEach(c => {
        let character = "";
        character += "<div class='character' dataCharacter='" + JSON.stringify(c) + "'>";
        character += '<div class="characterImageContainer">';
        character += '<img class="characterImage" src="' + c.image + '" />';
        character += '</div>';
        character += '<div class="characterName">';
        character += c.firstName + '<br />' + c.lastName;
        character += '</div></div>';
        let newCharacter = $(character);
        characterSelect.append(newCharacter);
        newCharacter.data('key', c);
    });

    //bind event handlers to each character
    $(".character").click(function (e) {
        let characterData = $(this).data('key');
        selectedCharacter = characterData;

        $("#selectedCharacterImage").attr('src', imagePath + characterData.avatar);
        $("#selectedCharacterName").text(characterData.firstName + ' ' + characterData.lastName)
    })
}