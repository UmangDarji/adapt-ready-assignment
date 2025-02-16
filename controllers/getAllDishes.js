const excelToJson = require('csvtojson');
const fs = require('fs');
const path = require('path');

function getAllDishes(req, res) {
    // console.log("path ", path.join(__dirname, `../indian_food.csv`))
    const { dish } = req.body;
    excelToJson().fromFile(path.join(__dirname, `../indian_food.csv`))
        .then((jsonData) => {
            if (dish && dish != "") {
                const finalOutput = jsonData.filter(x => x.name.toLowerCase() == dish.toLowerCase());
                return res.status(200).send({
                    status: true,
                    data: finalOutput
                })
            }
            res.status(200).send({
                status: true,
                data: jsonData
            })
        })
        .catch((err) => {
            console.log("ERRORRRRR -------->", err);
            res.status(400).send({
                status: false,
                message: "Not able to fetch Data"
            })
        })
}
module.exports.getAllDishes = getAllDishes