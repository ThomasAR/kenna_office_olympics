$(document).ready(function () {

    // let inputs = [
    //     { label: "Season", type: "select", options: ["2019", "2018", "2017"] },
    //     { label: "Region", type: "select", options: ["EAST", "WEST"] },
    //     { label: "Name", type: "string" }
    // ]

    // const Http = new XMLHttpRequest();
    const url = "http://10.101.189.29:5000";
    // const url = "http://127.0.0.1:5000"
    // Http.open("GET", url);
    // Http.send();

    // Http.onreadystatechange = (e) => {
    //     console.log(Http.responseText);
    // }


    let data = [];

    $.ajax({
        type: 'GET',
        url: url + "/loadParameterData",
        cache: false,
        crossDomain: true,
        // jsonpCallback: 'loadParameterData',
        // success: loadParameterData
        success: function (res) {
            loadParameterData(JSON.parse(res))
        },
        error: function (res) {
            console.log("Error connecting to server")
        }
    });

    $.ajax({
        type: 'GET',
        url: url + "/getFiles",
        cache: false,
        crossDomain: true,
        success: function (res) {
            loadDownloads(res);
        }
    })


    function loadParameterData(res) {

        data = res;
        let templates = res.map(r => r.template);


        $("#templateDropdown").append(`
                            ${templates.map(t => {
            return `<option>${t}</option>`;
        })}`)

        loadParameterInputs(templates[0]);
    }

    function loadParameterInputs(template) {
        $("#parameterInputs").empty();

        data.map(r => {
            if (r.template === template) {
                r.fields.forEach(p => {
                    if (p.type === 'select') {
                        $("#parameterInputs").append(createDropdown(p.label, p.options));
                    }
                    else if (p.type === 'string') {
                        $("#parameterInputs").append(createInputBox(p.label));
                    }
                })
            }
        });
    }

    function getQueryTable(res) {
        console.log(res);
    }

    function loadDownloads(files) {
        console.log(files);
        files = JSON.parse(files);
        let date = "";
        files.forEach(f => {
            date = new Date(f[1]);
            f[1] = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
        })
        files.sort((a, b) => {
            return a[1] < b[1];
        }).forEach(f => {
            date = f[1];
            $("#filesContainer").append(`<a class="btn btn-basf downloadButton" id="downloadCSV" href="files/${f[0]}" download><img class="excelImage" src="img/excelIcon.png"> ${f[0]} <span class="fileDate">${f[1]}</span></a>`)
        });
    }

    $("#templateDropdown").change(function () {
        loadParameterInputs($(this).val());
    })

    $("#runScript").click(function () {
        console.log($("#templateDropdown").val());

        // let test_data = [
        //     { label: "Season", type: "select", options: ["2019", "2018", "2017"] },
        //     { label: "Region", type: "select", options: ["EAST", "WEST"] },
        //     { label: "Name", type: "string" }
        // ];

        // $.ajax({
        //     type: 'POST',
        //     dataType: 'jsonp',
        //     url: "http://127.0.0.1:5000",
        //     data: { 'data': test_data },
        //     cache: false,
        //     crossDomain: true,
        //     jsonpCallback: 'getQueryTable',
        //     success: getQueryTable
        // });
        $("#downloadFiles").append(`<a class="btn btn-basf downloadButton" id="downloadCSV" href="${'files/TestCSV_1.csv'}" download><img class="excelImage" src="img/excelIcon.png"> ${'TestCSV_1.csv'}</a>`)
        // $("#")
    })

});

let createDropdown = (label, options) => {
    let dropdown = `<div class="parameterInputDiv"> <p>${label}</p>
                        <select class="form-control" id="${label}">
                            ${options.map(o => {
        return `<option>${o}</option>`;
    })}
                        </select></div>`

    return dropdown;
}

let createInputBox = label => {
    let inputbox = `<div class="parameterInputDiv"><p>${label}</p><input class="form-control" type="text"></div>`
    return inputbox;
}