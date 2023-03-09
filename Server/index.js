const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserAuthModel = require("./models/user.model");
const cors = require("cors")

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Users');


app.post("/user_auth", async (req, res) => {
        const data = new UserAuthModel({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : req.body.password
        });
        await data.save();
        res.send("<h1>Hello World</h1>");
});

app.post("/login", async (req, res) => {
        const user = await UserAuthModel.findOne({
                email : req.body.email,
                password : req.body.password
        });

        console.log(user);

        if (user) {
		return res.json({ status: 200, error: 'Invalid login' })
	} else {
                return res.json({ status: 404, error: "No Error" })
        }
});

app.use("/", (req, res) => {
        res.send("<h1>Hello World</h1>");
});

app.listen(3000);