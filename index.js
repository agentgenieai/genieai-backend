require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const server = express();
server.use(cors(
  {
    orgin:["https://genieai-frontend.vercel.app"],
    methods:["POST"],
    credentials:true
  }
));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const itemSchema = new mongoose.Schema({
  address: String,
});

const User = mongoose.model("user", itemSchema);

server.post("/", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    let user = new User();
    user.address = req.body.evmaddress;
    await user.save();
    console.log("Address:", req.body.evmaddress);
    res.status(201).send("success");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
});


server.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});