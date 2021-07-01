const { Router } = require("express");
const routerAuth = Router()
const User = require("../models/User")

routerAuth.post("/register", async (req,res)=>{

	const user = new User({
		name: req.body.name,
		email : req.body.email,
		password : req.body.password
	})
	
	try{
		const savedUser = await user.save()
		res.send(savedUser)
	}catch(eror){
		res.status(400).send(err)
	}
})



module.exports = routerAuth