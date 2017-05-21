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
        email: {type: String, required: true, unique:true},
        date: {type: Date, default: Date.now},
  });

var projectSchema = new mongoose.Schema({
	title : {type :String, required : true},
	subtitle : {type : String},
	description : {type : String, required :true},
	image : {data : Buffer, contentType : String },
	gallery : [{data : Buffer, contentType : String}],
},
  {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

projectSchema.virtual("created_at_display")
	.get(function() {
		time = new Date(this.created_at).toLocaleDateString();
		return time;
	})

module.exports = {subscriptions : mongoose.model('subscriptions', subscriptionSchema) ,
projects : mongoose.model('projects', projectSchema)};
