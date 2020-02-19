const express = require("express");
const Say = require("../../models/says");
const Comment = require("../../models/comments");
const withAuth = require("../../utils/withAuth");

const router = express.Router();

router.post("/new-post", withAuth, (req, res) => {
    const authuserid = req.authuserid;
    // content said_by

    console.log(authuserid);
    const { content } = req.body;
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

router.post("/post/like", withAuth, (req, res) => {
    const { authuserid } = req;
    const { say } = req.body;
    Say.findOne({ _id: say }, (err, found) => {
        if (err) {
            return res.json({
                error: true,
                message: "Something broke"
            });
        }
        if (found) {
            let { likes } = found;
            let tempLikes = likes;
            if (likes.indexOf(authuserid) > -1) {
                // user already likes the post then remove it
                tempLikes.splice(likes.indexOf(authuserid), 1);
                found.likes = tempLikes;
                found
                    .save()
                    .then(() => {
                        res.json({
                            message: "unliked"
                        });
                    })
                    .catch((err) => console.log(err));
            } else {
                found.likes.push(authuserid);
                found.save(() => {
                    res.json({
                        message: "liked"
                    });
                });
            }
        }
    });
});

module.exports = router;
