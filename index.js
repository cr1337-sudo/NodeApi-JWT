const express = require("express")
const app = express();
const mongoose = require("mongoose");
//Import Routes
const authRoute = require("./routes/auth")

//Connect to DB

const DB = async () => {
	try {
		const DB = await mongoose.connect('mongodb://localhost:27017/Auth', { useNewUrlParser: true, useUnifiedTopology: true });
		console.log("Conexion exitosa", DB.connection.name)
	} catch (error) {
		console.log(error)
	}
}
DB();

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute)

app.listen(3000, ()=> console.log("Serverup at port 3000"))