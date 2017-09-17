var express = require('express');
var router = express.Router();
var csv = require('express-csv');
var mongoose = require('mongoose');
var models = require('../models/models');
var subscriptions = models.subscriptions;
var utils = require('../utils.js');


/* GET home page. */
//here will be the site's main routes that returns HTML and not JSON
router.get('/', function(req, res, next) {
	models.projects.find().exec(function(err, projects){
		res.render('index', { title: 'express' , projects: projects});
	});
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

router.post('/contact',function(req, res, next) {

	req.body //=> infos du formulaire pour poster
    if (err) res.json(err);
    res.json({state:"success"})

});

router.post('/subscribe', function(req, res, next) {
  subscriptions.create(req.body, function (err, subscription) {
    if (err) {res.json(err)} else {
		console.log("pass");
		console.log(subscription);
		//res.redirect('/');
		utils.send_an_email(subscription);
		res.render('validation')
	}
  });
});


router.get('/projects',function(req, res, next) {
    res.json(projects);
});

router.get('/projects/:id',function(req, res, next) {
    res.json(projects[req.params.id]);
});

router.get('/admin', function(req, res, next){
		res.render("admin",{});
});

module.exports = router;
