const express = require("express");
const router = express.Router();
const Says = require("../../models/says");

router.get("/:profileid", (req, res) => {
    const { profileid } = req.params;
    Says.find({ said_by: profileid })
        .populate({
            path: "said_by",
            select: ["firstname", "lastname", "nickname", "email", "time_posted"]
        })
        .exec((err, says) => {
            if (err) {
                console.log(err);
                return res.json({
                    error: true,
                    message: "Oops something broke"
                });
            }

            res.json({
                error: false,
                says
            });
        });
});

module.exports = router;
