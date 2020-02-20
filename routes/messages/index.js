const express = require("express");
const Conversations = require("../../models/conversation");

const router = express.Router();
const withAuth = require("../../utils/withAuth");

router.post("/new-message", withAuth, (req, res) => {
    res.end();
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
                    conversations: userConversations
                });
            }

            res.json({
                error: false,
                conversations: []
            });
        }
    );
});

module.exports = router;
