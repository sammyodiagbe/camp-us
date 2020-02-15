const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Connection = require("../../models/connections");

router.get("/:profileid", (req, res) => {
    const { profileid } = req.params;
    User.findOne({ _id: profileid }, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({
                error: true,
                message: "oops something went wrong"
            });
        }
        res.json({
            error: false,
            user
        });
    });
});

router.get("/check-connection/:authuserid/:friendid", (req, res) => {
    const { authuserid, friendid } = req.params;

    Connection.findOne(
        {
            $or: [
                { follower: authuserid, followee: friendid },
                { followee: friendid, follower: authuserid }
            ]
        },
        (err, any) => {
            let isMutual = false;
            let isFollowing = false;
            if (err) {
                return res.json({
                    error: true,
                    message: "Ooops something broke"
                });
            }

            // if no relationship column has been made between the two user
            if (!any) {
                isMutual = false;
                isFollowing = false;
            }

            // if there is a mutual relationship between users
            if (any.mutual_connection === true) {
                isMutual = true;
                isFollowing = true;
            } else {
                // if no mutual relationship but the auth user follows
                if (any.follower === authuserid) {
                    isFollowing = true;
                }
            }
            return res.json({
                error: false,
                isFollowing,
                isMutual
            });
        }
    );
});
module.exports = router;
