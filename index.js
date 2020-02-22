require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);
const IO = require("./io")(server);
const PORT = process.env.PORT || 5000;
const baseUrl = "/api/camp-us";

require("./io/actions")(IO);
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`${baseUrl}/auth`, require("./routes/auth-routes/auth-routes"));
app.use(`${baseUrl}/connections`, require("./routes/connection-routes"));
app.use(`${baseUrl}/profile`, require("./routes/profile/profile"));
app.use(`${baseUrl}/says`, require("./routes/says/says"));
app.use(`${baseUrl}/interaction`, require("./routes/post-comment"));
app.use(`${baseUrl}/messaging`, require("./routes/messages"));

// I

mongoose
    .connect(process.env.local_database_connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        server.listen(PORT, () => {
            console.log("connected");
        });
    })
    .catch((err) => {
        console.log(`Something went wrong , ${err}`);
    });
