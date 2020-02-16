const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    const { ssid } = req.cookies;
    if (ssid) {
        let returnData = jwt.verify(ssid, process.env.JWT_SECRET);
        const { user } = returnData;
        const { _id: authuserid } = user;

        req.authuserid = authuserid;
        return next();
    }

    res.json({
        error: false,
        message: "Unauthorized User"
    });
};
