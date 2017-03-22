var mongoose = require('mongoose');


// Connect to MongoDB and create/use database called buenosAires
mongoose.connect('mongodb://localhost/buenosAires').then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


// models definition

//Subscriptions

var states = [
  'awaiting',
  'validated',
  'checked-out',
];

var subscriptionSchema = new mongoose.Schema({
        firstName: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true, unique:true},
        date: {type: Date, default: Date.now},
        //states are used to determines if user have confirmed / has unsuscripted
        //to the newsletter
        state: {type: String, enum: states ,default:'awaiting'},
  });

module.exports = mongoose.model('subscription', subscriptionSchema);
