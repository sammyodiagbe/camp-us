const express = require("express");

const router = express.Router();

const User = require("../../models/user");
const withAuth = require("../../utils/withAuth");

router.get("/search/:searchquery", withAuth, (req, res) => {
    const { searchquery } = req.params;
    const regex = new RegExp(`(?=${searchquery})`, "ig");
    User.find(
        {
            $or: [{ name: { $regex: regex } }, { nickname: { $regex: regex } }]
        },
        "name nickname",
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
