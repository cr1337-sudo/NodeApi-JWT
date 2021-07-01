const { Router } = require("express");
const routerAuth = Router()
const User = require("../models/User")
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


routerAuth.post("/register", async (req, res) => {
	const { error } = registerValidation(req.body)
	if (error) {
		res.status(400).send(error.details[0].message)
	}

	//Checking if the user is already in the databse
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist) return res.status(400).send("Email already exists")

	//Hach passwords
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Create a nwe user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	})

	try {
		const savedUser = await user.save()
		res.send({ user: savedUser.name })
	} catch (eror) {
		res.status(400).send(err)
	}
})


//Login
routerAuth.post("/login", async (req, res) => {
	const { error } = loginValidation(req.body)
	if (error) {
		res.status(400).send(error.details[0].message)
	}
	//Checking if the user is already in the databse
	const user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send("Email doesnt exists")

	//Check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password)
	if (!validPass) return res.status(400).send("Invalid password")

	//Create and assing a token
	const secretPass = "kjkszpj"
	const token = jwt.sign({_id: user._id}, secretPass);

	res.header("auth-token", token).send(token);


})

module.exports = routerAuth