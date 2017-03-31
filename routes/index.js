var express = require('express');
var router = express.Router();
var csv = require('express-csv');
var mongoose = require('mongoose');
var subscriptions = require('../models/models.js');

/* GET home page. */
//here will be the site's main routes that returns HTML and not JSON
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/subscriptions/csv',function(req, res, next) {
//select only subscription that have been validated, and export them to CSV file for direct download
  subscriptions.find()
  .select({ "_id":0, "name": 1, "firstName": 1, "email": 1 }).where({"state":"validated"})
  .exec(function (err, subscriptions) {
    if (err) res.json(err);
    subscriptions = JSON.parse(JSON.stringify(subscriptions));
    res.csv(subscriptions);
  });
});

router.get('/subscriptions/validation/:id',function(req, res, next) {
  //Validation of a subscription by ID
  subscriptions.findOneAndUpdate({_id:req.params.id},{"state":"validated"}, function (err) {
    if (err) res.json(err);
    res.json({state:"success"})
  });
});

module.exports = router;
