const Connection = require("../../../models/connections");
const Says = require("../../../models/says");

module.exports = (io) => {
    io.of("/feeds").on("connection", (socket) => {
        socket.on("get_feeds_update", (data) => {
            const { oldFeeds, authuserid } = data;
            Connection.find(
                { $or: [{ follower: authuserid }, { mutual_connection: true }] },
                "follower followee",
                (err, data) => {
                    if (err) {
                        return;
                    }

                    let filteredData = data.map((entry) => {
                        const { follower, followee } = entry;
                        return follower === authuserid ? followee : follower;
                    });

                    Says.find({ said_by: { $in: [authuserid, ...filteredData] } })
                        .populate("said_by", "name nickname")
                        .exec((err, data) => {
                            if (
                                oldFeeds.length === data.length &&
                                JSON.stringify(oldFeeds) === JSON.stringify(data)
                            ) {
                                return;
                            } else {
                                socket.emit("got_new_feeds", data);
                            }
                        });
                }
            );
        });
    });
};
