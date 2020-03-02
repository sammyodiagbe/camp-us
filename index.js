require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const IO = require("./io")(server);
const PORT = process.env.PORT || 5000;
const baseUrl = "/api/camp-us";

require("./io/namespaces/chat")(IO);
require("./io/namespaces/feeds")(IO);
require("./io/namespaces/profile")(IO);
var whitelist = [
    "http://localhost:3000",
    "http://192.168.43.50:3000",
    "http://192.168.43.255:3000",
    "https://konert.herokuapp.com/"
];
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};

app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors({ origin: "https://konert.herokuapp.com/" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`${baseUrl}/auth`, require("./routes/auth-routes/auth-routes"));
app.use(`${baseUrl}/connections`, require("./routes/connection-routes"));
app.use(`${baseUrl}/profile`, require("./routes/profile/profile"));
app.use(`${baseUrl}/says`, require("./routes/says/says"));
app.use(`${baseUrl}/interaction`, require("./routes/post-comment"));
app.use(`${baseUrl}/messaging`, require("./routes/messages"));
app.use(`${baseUrl}/people`, require("./routes/search"));
app.use(`${baseUrl}/notifications/`, require("./routes/notifications"));
// I

if (process.env.enviroment === "production") {
    app.use(express.static("client/build"));

    app.get("*", (request, response) => {
        response.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

mongoose
    .connect(
        process.env.enviroment === "development"
            ? process.env.local_database_connection_string
            : process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        server.listen(PORT, () => {
            console.log("connected");
        });
    })
    .catch((err) => {
        console.log(`Something went wrong , ${err}`);
    });
