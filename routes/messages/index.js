const express = require("express");
const Conversations = require("../../models/conversation");
const Message = require("../../models/messages");

const router = express.Router();
const withAuth = require("../../utils/withAuth");

router.post("/new-message", withAuth, (req, res) => {
    const { authuserid } = req;
    const { friendid, body } = req.body;
    Conversations.findOne(
        {
            $or: [
                { user1: authuserid, user2: friendid },
                { user1: friendid, user2: authuserid }
            ]
        },
        (err, conversation) => {
            if (err) {
                return res.json({
                    error: err,
                    message: "Something broke"
                });
            }

            const message = new Message({
                sender: authuserid,
                body
            });

            if (conversation) {
                message.save((err, doc) => {
                    if (err) {
                        return res.json({
                            error: err,
                            message: "Something broke"
                        });
                    }
                    conversation.messages.push(doc.id);
                    conversation.save((err, done) => {
                        if (err) return res.json({ error: true, message: "Something broke" });

                        return res.json({
                            message: "Nice work"
                        });
                    });
                });
            } else {
                let newconversation = new Conversations({
                    user1: authuserid,
                    user2: friendid,
                    messages: []
                });
                message.save((err, doc) => {
                    if (err) return res.json({ error: err, message: "Something broke" });
                    newconversation.messages.push(doc.id);
                    newconversation.save((err, doc) => {
                        if (err) return res.json({ error: err, message: "Something broke" });
                        res.json({
                            message: "Nice work"
                        });
                    });
                });
            }
        }
    );
});

router.get("/get-all-conversations", withAuth, (req, res) => {
    const { authuserid } = req;

    Conversations.find(
        { $or: [{ user1: authuserid }, { user2: authuserid }] },
        (err, userConversations) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "something broke"
                });
            }

            if (userConversations.length) {
                return res.json({
                    error: false,
                    conversations: userConversations.reverse()[0]
                });
            }

            res.json({
                error: false,
                conversations: []
            });
        }
    );
});

router.get("/get-active-conversation/:friendid", withAuth, (req, res) => {
    const { authuserid } = req;
    const { friendid } = req.params;

    Conversations.findOne({
        $or: [
            { user1: authuserid, user2: friendid },
            { user1: friendid, user2: authuserid }
        ]
    })
        .populate("messages")
        .exec((err, conversation) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "Something broke"
                });
            }

            res.json({
                conversation
            });
        });
});

module.exports = router;
