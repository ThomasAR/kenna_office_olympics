let characters = [
    {
        firstName: "Brooklyn",
        lastName: "Kutasienski"
    },
    {
        firstName: "Cathy",
        lastName: "Cheng"
    },
    {
        firstName: "Daniela Ana",
        lastName: "Florea"
    },
    {
        firstName: "Darren",
        lastName: "Rothblott"
    },
    {
        firstName: "Emma",
        lastName: "Annett"
    },
    {
        firstName: "Jared",
        lastName: "Clark"
    },
    {
        firstName: "Joel",
        lastName: "Silas"
    },
    {
        firstName: "Joshua",
        lastName: "Gorospe"
    },
    {
        firstName: "Kihwan",
        lastName: "Paeng"
    },
    {
        firstName: "Nick",
        lastName: "Airdrie"
    },
    {
        firstName: "Prisha",
        lastName: "Rathi"
    },
    {
        firstName: "Rachel",
        lastName: "Radake"
    },
    {
        firstName: "Reesha",
        lastName: "Jagdeo"
    },
    {
        firstName: "Stephen",
        lastName: "Hwang"
    },
    {
        firstName: "Surajpratap",
        lastName: "Goraya"
    },
    {
        firstName: "Syed Saad",
        lastName: "Ain"
    },
    {
        firstName: "Tessa",
        lastName: "Brenders"
    },
    {
        firstName: "Thomas",
        lastName: "Arsenault"
    },
    {
        firstName: "William",
        lastName: "Ramshaw"
    },
    {
        firstName: "Xiaoling",
        lastName: "Liu"
    },
    {
        firstName: "Zahra",
        lastName: "Akhtar"
    },
    {
        firstName: "Zixiao",
        lastName: "Min"
    },
]

characters.forEach(c => {
    let obj = {};
    obj.firstName = c.firstName;
    obj.lastName = c.lastName;
    obj.image = "Coop_" + c.firstName + "_" + c.lastName + ".jpg";
    obj.avatar = "Coop_" + c.firstName + "_" + c.lastName + ".png";
    obj.coop = true;
    console.log(JSON.stringify(obj))
    console.log(",")
})