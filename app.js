const express = require('express');
const router = require('./router/router').router;
const app = express();

app.use(express.json());

app.use('/', router)

app.listen(8080);

console.log("SERVER IS RUNNING ON PORT - 8080");
// const path = __dirname;
// console.log(path+`\\indian_food.csv`);
