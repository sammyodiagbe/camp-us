const express = require("express");
const Say = require("../../models/says");
const Comment = require("../../models/comments");
const Notification = require("../../models/notification");
const withAuth = require("../../utils/withAuth");

const router = express.Router();

router.get("/getpost/:postid", withAuth, (req, res) => {
    const { postid } = req.params;
    Say.findOne({ _id: postid })
        .populate("said_by", "name nickname")
        .exec((err, post) => {
            if (err)
                return res.json({
                    error: true,
                    message: "Something broke"
                });
            res.json({
                say: post
            });
        });
});

router.post("/new-post", withAuth, (req, res) => {
    const authuserid = req.authuserid;
    // content said_by
    const { content } = req.body;
    const newSay = new Say({
        content,
        said_by: authuserid
    });

    newSay
        .save()
        .then((doc) => {
            const newLikeNotifications = new Notification({
                ref: doc._id,
                verb: "LIKE",
                towhom: authuserid
            });

            const newCommentNotifications = new Notification({
                ref: doc._id,
                verb: "COMMENT",
                towhom: authuserid
            });
            newLikeNotifications.save();
            newCommentNotifications.save();
            return res.json({
                error: false,
                message: "Successfully Posted"
            });
        })
        .catch((err) => console.log(err));
});

router.post("/new-comment", withAuth, (req, res) => {
    const authuserid = req.authuserid;
    const verb = "COMMENT";
    const { comment, postid } = req.body;
    Say.findOne({ _id: postid }, (err, say) => {
        if (err) {
            return res.json({
                error: true,
                message: "Something broke"
            });
        }
        if (!say) return;

        // if there is a say
        const newComment = new Comment({
            body: comment,
            said_by: authuserid
        });
        newComment.save(() => {
            // create a notification
            Notification.findOne({ ref: postid, verb }, (err, notification) => {
                if (err) {
                    return;
                }
                let bywhom = notification.bywhom;
                if (bywhom.indexOf(authuserid) > -1) {
                    return;
                } else {
                    bywhom.push(authuserid);
                    notification.bywhom = bywhom;
                    notification.save();
                }
            });
        });
    });
});

router.post("/post/like", withAuth, (req, res) => {
    const { authuserid } = req;
    const { say } = req.body;
    const verb = "LIKE";
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
                        // remove user from the notification list
                        Notification.findOne({ ref: say, verb }, (err, notification) => {
                            if (err) {
                                console.log(err);
                                return;
                                //  pass
                            }
                            if (!(notification.bywhom.indexOf(authuserid) > -1)) return;
                            let bywhom = notification.bywhom;
                            bywhom.splice(bywhom.indexOf(authuserid), 1);
                            notification.bywhom = bywhom;
                            notification.save();
                        });
                        res.json({
                            message: "unliked"
                        });
                    })
                    .catch((err) => console.log(err));
            } else {
                found.likes.push(authuserid);
                found.save(() => {
                    Notification.findOne({ ref: say, verb }, (err, notification) => {
                        if (err) return;
                        if (notification) {
                            if (notification.bywhom.indexOf(authuserid) > -1) {
                                return;
                            } else {
                                notification.bywhom.push(authuserid);
                                notification.save();
                            }
                        }
                    });
                    res.json({
                        message: "liked"
                    });
                });
            }
        }
    });
});

module.exports = router;
