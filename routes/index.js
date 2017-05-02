var express = require('express');
var router = express.Router();
var csv = require('express-csv');
var mongoose = require('mongoose');
var subscriptions = require('../models/models.js');


var projects = [
	{title:"projet numéro 1", subtitle: "un premier projet de l'agence", text:"lorem ipsum sed dolor inut", image:"monimage.png", images: [{img:"project1.png",thumbnail:"project1-thumb.png"}]},
	{title:"projet numéro 2", subtitle: "un second projet de l'agence", text:"lorem ipsum sed dolor inut", image:"monimage.png", images: [{img:"project1.png",thumbnail:"project1-thumb.png"}]},
];


/* GET home page. */
//here will be the site's main routes that returns HTML and not JSON
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' , projects: projects});
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


router.get('/projects',function(req, res, next) {
    res.json(projects);
});

router.get('/projects/:id',function(req, res, next) {
    res.json(projects[req.params.id]);
});


module.exports = router;
