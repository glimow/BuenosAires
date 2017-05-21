var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');
var subscriptions = models.subscriptions;
var projects = models.projects ;
//Here we are going to define our REST api : get all subscriptions, post one subscription,
//update one subscription, delete one subscription



// TODO : authentification

/* GET users listing. */
router.get('/subscriptions', function(req, res, next) {
  subscriptions.find(function (err, subscriptions) {
    if (err) {
      res.json({state:"error", err:err});
      console.log(err);
    } else {
      res.json(subscriptions);
    }
  });
});

//POST a new subscription
router.post('/subscriptions', function(req, res, next) {
  subscriptions.create(req.body, function (err, subscription) {
    if (err) {res.json({state:"error", err:err});
      console.log(err);
    } else {
      send_an_email(subscription);
      res.json(subscription);
    }
  });
});

//DELETE a subscription
router.delete('/subscriptions/:id', function(req, res, next) {
  subscriptions.remove({_id:req.params.id}, function (err) {
    if (err) {
      res.json({state:"error", err:err});
      console.log(err);
    } else {
      res.json({state:"success"});
    }
  });
});

/* GET project listing. */
router.get('/projects', function(req, res, next) {
  projects.find().sort("created_at").exec(function (err, projects) {
    if (err) {
      res.json({state:"error", err:err});
      console.log(err);
    } else {
      res.json(projects);
    }
  });
});

//POST a new project
router.post('/projects', function(req, res, next) {
  projects.create(req.body, function (err, project) {
    if (err) {
      res.json({state:"error", err:err});
      console.log(err);
    } else {
      res.json({state:"success", project:project});
    }
  });
});

//DELETE a projet
router.delete('/projects/:id', function(req, res, next) {
  projects.remove({_id:req.params.id}, function (err) {
    if (err) {
      res.json({state:"error", err:err});
      console.log(err);
    } else {
      res.json({state:"success"});
    }
  });
});

//EDIT a project
router.post('/projects/:id', function(req, res, next){
  projects.findOneAndUpdate({_id:req.params.id}, req.body, function(err, project){
    if (err) {
      res.json({state:"error", err:err});
      console.log(err);
    } else {
      res.json({state:"success", project:project});
    }
  })
});

module.exports = router;
