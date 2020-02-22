const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Connection = require("../../models/connections");
const withAuth = require("../../utils/withAuth");

router.get("/:profileid", withAuth, (req, res) => {
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

router.get("/check-connection/:friendid", withAuth, (req, res) => {
    const authuserid = req.authuserid;
    const { friendid } = req.params;
    Connection.findOne(
        {
            $or: [
                { follower: authuserid, followee: friendid },
                { follower: friendid, followee: authuserid }
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
            console.log("found connections ", any);
            // if no relationship column has been made between the two user
            if (!any) {
                console.log("no relationship table has been found");
                console.log(any);
                isMutual = false;
                isFollowing = false;
                return res.json({
                    error: false,
                    isFollowing,
                    isMutual
                });
            } else {
                if (any.mutual_connection == true) {
                    isMutual = true;
                    isFollowing = true;
                    return res.json({
                        isMutual,
                        isFollowing
                    });
                } else {
                    // if no mutual relationship but the auth user follows
                    if (any.follower == authuserid) {
                        isFollowing = true;
                        isMutual = false;
                        return res.json({
                            isFollowing,
                            isMutual
                        });
                    }
                }
            }

            // if there is a mutual relationship between userss
        }
    );
});

router.get("/feeds", (req, res) => {});
module.exports = router;
