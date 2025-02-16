const excelToJson = require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

async function deleteDish(req, res) {
    const { name } = req.body;

    excelToJson().fromFile(path.join(__dirname, `../indian_food.csv`))
        .then((jsonData) => {
            let indexOf = jsonData.findIndex(x => x.name == name)
            if (indexOf < 0) {
                return res.status(400).send({
                    status: false,
                    message: "Dish does not exists. Please try deleting the existing Dish"
                })
            }
            jsonData.splice(indexOf, 1);
            const updatedJsonData = [...jsonData];
            const json2csvParser = new Parser();
            const updatedCsvData = json2csvParser.parse(updatedJsonData);

            fs.writeFileSync(path.join(__dirname, `../indian_food.csv`), updatedCsvData, 'utf8');

            res.status(200).send({
                status: true,
                message: "Data Deleted successfully"
            })

        })
        .catch((err) => {
            console.log("ERRORRRRR -------->", err);
            res.status(400).send({
                status: false,
                message: "Failed to insert data"
            })
        })
}
module.exports.deleteDish = deleteDish