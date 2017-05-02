var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./models/models.js');
var subscriptions = models.subscriptions;
var projects = models.projects ;
var email=require("emailjs/email");
var server=email.server.connect({
  user:"kalos",
  password:"",
  host: "zemail.ensta.fr",
  ssl: true,
});

function send_an_email(subscription){
  server.send({
    text: "Merci pour votre inscription à la newsletter. Pour annuler votre inscription veuillez copier coller ce lien dans votre navigateur : http://localhost:3000/subscriptions/delete/"+subscription._id,
    from: "Buenos Aires <tristan.kalos@ensta.fr>",
    to: " <"+subscription.email+">",
    subject: "Finalisation de votre inscription à la newsletter",
    attachement:
    [{data:"<html>Merci pour votre inscription à la newsletter. Pour annuler votre inscription veuillez cliquer sur ce lien : <a href='http://192.168.0.67:3000/subscriptions/delete/"+subscription._id+"'>Annuler votre inscription</a></html>", alternative:true},]
  }, function(err, message) { console.log(err || message); });

}

module.exports = {
	send_an_email : send_an_email ,
};
