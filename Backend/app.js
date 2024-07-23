const express = require('express');
const app = express();

app.use(express.json)

app.get("/", (req, res) => {
    res.send("Hello Word");
})

// Route Imports
const product = require("./routes/productRoute");

app.use("api/v1", product);

module.exports = app;