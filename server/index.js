require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./Route/route");
require("./DB/connection");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));



const stripe=require('stripe')(process.env.stripe_secret_key)


app.use(router);
const PORT = process.env.PORT;
app.use("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
app.listen(PORT, (req, res) => {
  console.log(`Server ${PORT} created`);
});
