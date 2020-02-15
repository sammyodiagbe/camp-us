const express = require("express");
const router = express.Router();
const Says = require("../../models/says");

router.get("/:profileid", (req, res) => {
    const { profileid } = req.params;

    Says.find({ talker: profileid }, (err, says) => {
        if (err) {
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
