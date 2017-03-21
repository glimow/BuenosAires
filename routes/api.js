var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var subscriptions = require('../models/models.js');
//Here we are going to define our REST api : get all subscriptions, post one subscription,
//update one subscription, delete one subscription

// TODO : authentification
/* GET users listing. */
router.get('/subscriptions', function(req, res, next) {
  subscriptions.find(function (err, subscriptions) {
    if (err) res.json(err);
    res.json(subscriptions);
  });
});

router.post('/subscriptions', function(req, res, next) {
  subscriptions.create(req.body, function (err, subscription) {
    if (err) res.json(err);
    res.json(subscription);
  });
});

module.exports = router;
