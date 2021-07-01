const {Schema, model} = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		min:6
	},
	email:{
		type: String,required : true,
		max: 120,
		min:8
	},
	password:{
		type: String,
		requierd: true,
		max : 1000,
		min: 6
	},
	date:{
		type: Date,
		default : Date.now
	}

})

module.exports = model("User", userSchema)