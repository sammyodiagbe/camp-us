const express = require("express");

const router = express.Router();

const User = require("../../models/user");
const withAuth = require("../../utils/withAuth");

router.get("/search/:searchquery", withAuth, (req, res) => {
    const { searchquery } = req.params;
    console.log("let find user");
    User.find(
        {
            $or: [
                { firstname: { $regex: `${searchquery}` } },
                { lastname: { $regex: `${searchquery}` } },
                { nickname: { $regex: `${searchquery}` } }
            ]
        },
        "firstname lastname nickname",
        (err, users) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "Something broke"
                });
            }

            res.json({
                searchedusers: users
            });
        }
    );
});

module.exports = router;
