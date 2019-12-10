let IMAGE_PATH = '../resources/staff'

$(document).ready(function () {

    let table = $(".scoresTable");

    $.ajax({
        type: 'GET',
        url: FLASK_SERVER_URL + "/GetScores",
        crossDomain: true,
        success: function (res) {
            let place = 1;
            let data = JSON.parse(res);
            data = data.sort((a, b) => {
                return b.score - a.score
            })
            data.forEach(s => {
                let medal = "";
                // if (place === 1) medal = `<img class="medal" src="../resources/medals/first.png">`;
                if (place === 1) medal = "first";
                if (place === 2) medal = "second";
                if (place === 3) medal = "third";

                if (medal) place++;
                table.append(`<tr>
                                <td class="placeCell">${medal ? `<img class="medal" src="../resources/medals/${medal}.png">` : place++}</td>
                                <td><img class="tableImage" src="${IMAGE_PATH}/${s.avatar.replace(".png", ".jpg")}"></td>
                                <td>${s.nickname}</td>
                                <td>${s.character}</td>
                                <td>${s.score}</td>
                            </tr>`);
            })
        }
    })






});