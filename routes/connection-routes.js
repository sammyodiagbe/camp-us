const express = require("express");

const router = express.Router();
const Connections = require("../models/connections");

router.post("/follow", (req, res) => {
    const { follower, followee } = req.body;
    // check if there is a column where the followee already follows the user
    Connections.findOne({ follower: followee, followee: follower }, (err, found) => {
        if (err) {
            return res.json({
                error: true,
                message: "Ooops something went wrong"
            });
        }
        if (found) {
            // then all to do  is to update mutual connection
            found.mutual_connection = true;
            return found
                .save()
                .then(() => {
                    res.json({
                        error: false,
                        message: "You followed back"
                    });
                })
                .catch((err) => console.log(err));
        } else {
            // create a connection between the users
            const connection = new Connections({
                follower,
                followee
            });
            return connection
                .save()
                .then(() => {
                    res.json({
                        error: false,
                        message: "You started following" + followee
                    });
                })
                .catch((err) => console.log(err));
        }
    });
});

module.exports = router;
