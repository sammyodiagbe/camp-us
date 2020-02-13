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

router.post("/unfollow", (req, res) => {
    const { whoToUnfollow, byWhom } = req.body;
    Connections.findOne(
        {
            $or: [
                { follower: whoToUnfollow, followee: byWhom },
                { follower: byWhom, followee: whoToUnfollow }
            ]
        },
        (err, foundConnection) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "Something went wrong"
                });
            }

            if (!foundConnection) {
                return res.json({
                    error: true,
                    message: "No connections has been made"
                });
            }
            const { _id, follower, followee, mutual_connection } = foundConnection;

            // now that a connection is found

            // if the initiator of the unfollow action initiated the connection in the first place and mutual connection is false
            if (follower._id === byWhom) {
                // if the followee actually follows back
                if (mutual_connection === true) {
                    // swap the follower and the followee then set mutual relationship to false
                    foundConnection.follower = followee;
                    foundConnection.followee = follower;
                    foundConnection.mutual_connection = false;
                    foundConnection
                        .save()
                        .then(() => {
                            res.json({
                                error: false,
                                message: "You unfollowed them"
                            });
                        })
                        .catch((err) => console.log(err));
                } else {
                    // drop the connection column
                    Connections.findByIdAndDelete(_id, (err, done) => {
                        if (err) {
                            return res.json({
                                error: true,
                                message: "Oops something went wrong"
                            });
                        }

                        if (!done) {
                            return res.json({
                                error: true,
                                message: "Ooops please try again"
                            });
                        }

                        res.json({
                            error: false,
                            message: "You have unfollowed them"
                        });
                    });
                }
            } else {
                // the user did not initiate the connection
                foundConnection.mutual_connection = false;
                foundConnection
                    .save()
                    .then(() => {
                        res.json({
                            error: null,
                            message: "You have successfully unfollowed them"
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    );
});

module.exports = router;
