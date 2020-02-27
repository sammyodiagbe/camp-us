const express = require("express");

const router = express.Router();
const withAuth = require("../../utils/withAuth");
const Notification = require("../../models/notification");

router.get("/get-notifications", withAuth, (req, res) => {
    const { authuserid } = req;

    Notification.find({ towhom: authuserid }, (err, notifications) => {
        if (err) {
            return res.json({
                error: true,
                message: "Something broke"
            });
        }

        return notifications
            ? res.json({
                  error: false,
                  notifications
              })
            : res.json({
                  error: false,
                  notifications: []
              });
    });
});

module.exports = router;
