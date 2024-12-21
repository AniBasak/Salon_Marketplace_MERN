const express = require("express");
const app = express();

app.use(express.json());

const product = require("./routes/productRoute.js");
const customer = require("./routes/customerRoute.js");
const booking = require("./routes/bookingRoute.js");
// const review = require("./routes/reviewRoute.js"); 

app.use("/api/v1",product);
app.use("/api/v1",customer);
app.use("/api/v1", booking);
// app.use("/api/v1", review);

module.exports = app