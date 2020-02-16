const express = require("express");
const Say = require("../../models/says");
const Comment = require("../../models/comments");
const withAuth = require("../../utils/withAuth");

const router = express.Router();

router.post("/new-post", withAuth, (req, res) => {
    const authuserid = req.authuserid;
    // content said_by
    const newSay = new Say({
        content,
        said_by: authuserid
    });

    newSay
        .save()
        .then(() => {
            return res.json({
                error: false,
                message: "Successfully Posted"
            });
        })
        .catch((err) => console.log(err));
});

router.post("/new-comment", withAuth, (req, res) => {
    const authuserid = req.authuserid;

    const newComment = new Comment({
        content,
        said_by: authuserid
    });

    newComment
        .save()
        .then(() => {
            return res.json({
                error: false,
                message: "Successfully Commented"
            });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
