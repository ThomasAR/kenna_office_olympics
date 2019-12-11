let IMAGE_PATH = '../resources/staff'

$(document).ready(function () {

    let table = $(".scoresTable");

    $.ajax({
        type: 'GET',
        url: FLASK_SERVER_URL + "/GetScores",
        crossDomain: true,
        success: function (res) {
            let place = 0;
            let data = JSON.parse(res);
            data = data.sort((a, b) => {
                return b.score - a.score
            })
            data.forEach(s => {

                //check to make sure Sukhvir's not hacking me
                console.log(s.score.includes("\u200C"))
                sukhvirDidntMessWithThisScore = true;
                Object.keys(s).forEach(k => {
                    if (s[k].includes("<script") || s[k].includes("eval(") || (k === 'score' && ((s[k] - "3100" > 0) || !s[k].includes(".")))) sukhvirDidntMessWithThisScore = false;
                })

                if (sukhvirDidntMessWithThisScore) {

                    place++;

                    let medal = "";
                    // if (place === 1) medal = `<img class="medal" src="../resources/medals/first.png">`;
                    if (place === 1) medal = "first";
                    if (place === 2) medal = "second";
                    if (place === 3) medal = "third";

                    table.append(`<tr>
                                    <td class="placeCell">${medal ? `<img class="medal" src="../resources/medals/${medal}.png">` : place}</td>
                                    <td><img class="tableImage" src="${IMAGE_PATH}/${s.avatar.replace(".png", ".jpg")}"></td>
                                    <td>${s.character}</td>
                                    <td>${s.nickname}</td>
                                    <td>${s.score}</td>
                                </tr>`);
                }
            })
        }
    })






});