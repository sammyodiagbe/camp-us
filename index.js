require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", require("./routes/auth-routes/auth-routes"));

mongoose
    .connect(process.env.local_database_connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log("connected");
        });
    })
    .catch((err) => {
        console.log(`Something went wrong , ${err}`);
    });
