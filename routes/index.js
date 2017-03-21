var express = require('express');
var router = express.Router();
var csv = require('express-csv');
var mongoose = require('mongoose');
var subscriptions = require('../models/models.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/subscriptions/csv',function(req, res, next) {
  subscriptions.find(function (err, subscriptions) {
    if (err) res.json(err);
    subscriptions = JSON.parse(JSON.stringify(subscriptions));
    res.csv(subscriptions);
  });
});

module.exports = router;
