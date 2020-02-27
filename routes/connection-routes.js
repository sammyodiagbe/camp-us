const express = require("express");

const router = express.Router();
const Connections = require("../models/connections");
const withAuth = require("../utils/withAuth");

router.post("/follow", withAuth, (req, res) => {
    const authuser = req.authuserid;
    const { whomToFollow } = req.body;
    // check if there is a column where the followee already follows the user
    Connections.findOne(
        {
            $or: [
                { follower: authuser, followee: whomToFollow },
                { follower: whomToFollow, followee: authuser }
            ]
        },
        (err, foundConnection) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "Something broke"
                });
            }

            // else {
            //     // there is a mutual relationship already
            //     return res.json({
            //         error: false,
            //         message: "Already following"
            //     });
            // }
            if (foundConnection) {
                const { follower } = foundConnection;
                if (foundConnection.mutual_connection === true || follower == authuser) {
                    // the user already follows this person
                    return res.json({
                        error: false,
                        message: "Already Following"
                    });
                } else {
                    // if the follower is actually the current profile then it appears to be that the auth user is trying to follow back

                    foundConnection.followee = authuser;
                    foundConnection.mutual_connection = true;
                    return foundConnection
                        .save()
                        .then(() => {
                            res.json({
                                error: false,
                                message: "Successfully followed back"
                            });
                        })
                        .catch((err) => console.log(err));
                }
            } else {
                let newConnection = new Connections({
                    follower: authuser,
                    followee: whomToFollow
                });
                newConnection
                    .save()
                    .then(() => {
                        return res.json({
                            error: false,
                            message: "You started following"
                        });
                    })
                    .catch((err) => console.log(err));
            }
        }
    );
});

router.post("/unfollow", withAuth, (req, res) => {
    const byWhom = req.authuserid;
    const { whoToUnfollow } = req.body;
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
            if (follower == byWhom) {
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
                    Connections.findByIdAndDelete({ _id }, (err, done) => {
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
