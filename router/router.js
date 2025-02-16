const express = require('express');
const { getAllDishes } = require('../controllers/getAllDishes');
const { searchDish } = require('../controllers/searchDish');
const { createDish } = require('../controllers/createDish');
const { updateDish } = require('../controllers/updateDish');
const { deleteDish } = require('../controllers/deleteDish');
const app = express.Router();

app.post('/api/getAllDishes', function (req, res) {
    getAllDishes(req, res)
})

app.post('/api/searchDish', function (req, res) {
    searchDish(req, res)
})

app.post('/api/addDish', function (req, res) {
    createDish(req, res)
})

app.post('/api/updateDish', function (req, res) {
    updateDish(req, res)
})

app.post('/api/deleteDish', function (req, res) {
    deleteDish(req, res)
})



module.exports.router = app