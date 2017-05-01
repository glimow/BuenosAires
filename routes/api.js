var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var subscriptions = require('../models/models.js');
var email=require("emailjs/email");
var server=email.server.connect({
  user:"kalos",
  password:"Eipoh8Ei",
  host: "zemail.ensta.fr",
  ssl: true,
});

//Here we are going to define our REST api : get all subscriptions, post one subscription,
//update one subscription, delete one subscription


function send_an_email(subscription){
  server.send({
    text: "Merci pour votre inscription à la newsletter. Pour terminer votre inscription veuillez copier coller ce lien dans votre navigateur : http://localhost:3000/subscriptions/validation/"+subscription._id,
    from: "Buenos Aires <tristan.kalos@ensta.fr>",
    to: subscription.firstName + " " + subscription.name + " <"+subscription.email+">",
    subject: "Finalisation de votre inscription à la newsletter",
    attachement:
    [{data:"<html>Merci pour votre inscription à la newsletter. Pour annuler votre inscription veuillez cliquer sur ce lien : <a href='http://192.168.0.67:3000/subscriptions/delete/"+subscription._id+"'>Annuler votre inscription</a></html>", alternative:true},]
  }, function(err, message) { console.log(err || message); });

}
// TODO : authentification
/* GET users listing. */
router.get('/subscriptions', function(req, res, next) {
  subscriptions.find(function (err, subscriptions) {
    if (err) res.json(err);
    res.json(subscriptions);
  });
});

//POST a new subscription
router.post('/subscriptions', function(req, res, next) {
  subscriptions.create(req.body, function (err, subscription) {
    if (err) res.json(err);
    send_an_email(subscription);
    res.json(subscription);
  });
});

//DELETE a subscription
router.delete('/subscriptions/:id', function(req, res, next) {
  subscriptions.remove({_id:req.params.id}, function (err) {
    if (err) res.json(err);
    res.json({state:"success"})
  });
});

module.exports = router;
