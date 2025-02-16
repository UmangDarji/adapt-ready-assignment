const excelToJson = require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

async function createDish(req, res) {
    const { name, ingredients, diet, prep_time, cook_time, flavor_profile, course, state, region } = req.body;
    const schema = Joi.object({
        name: Joi.string().required(),
        ingredients: Joi.string().required(),
        diet: Joi.string().required(),
        prep_time: Joi.string().required(),
        cook_time: Joi.string().required(),
        flavor_profile: Joi.string().required(),
        course: Joi.string().required(),
        state: Joi.string().required(),
        region: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({
            status: false,
            message: error.details[0].message
        });
    }
    excelToJson().fromFile(path.join(__dirname, `../indian_food.csv`))
        .then((jsonData) => {
            if (jsonData.find(x => x.name == name)) {
                return res.status(400).send({
                    status: false,
                    message: "Dish Name Already present. Please try adding a new Dish"
                })
            }
            const updatedJsonData = [...jsonData, { name, ingredients, diet, prep_time, cook_time, flavor_profile, course, state, region }];
            const json2csvParser = new Parser();
            const updatedCsvData = json2csvParser.parse(updatedJsonData);

            fs.writeFileSync(path.join(__dirname, `../indian_food.csv`), updatedCsvData, 'utf8');
            console.log('Data successfully appended to CSV file');

            res.status(200).send({
                status: true,
                message: "Data added successfully"
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
module.exports.createDish = createDish