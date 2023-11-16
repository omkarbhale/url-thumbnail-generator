require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./db/connect.js");

const router = require("./routes/router.js");
app.use(router);

const start = async () => {
	await connect();
	app.listen(process.env.PORT || 3000, () => {
		console.log("Listening on port " + process.env.PORT || 3000);
	});
};

start();
