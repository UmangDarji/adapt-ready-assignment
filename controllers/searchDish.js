const excelToJson = require('csvtojson');
const fs = require('fs');
const path = require('path');

function searchDish(req, res) {
    const { ingredients } = req.body;
    excelToJson().fromFile(path.join(__dirname, `../indian_food.csv`))
        .then((jsonData) => {
            const result = jsonData.filter(item => {
                const ingredientsArray = item.ingredients.split(',').map(ingredients => ingredients.trim()).sort();
                return JSON.stringify(ingredientsArray) === JSON.stringify(ingredients.sort());
            });
            res.status(200).send({
                status: true,
                data: result
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
module.exports.searchDish = searchDish