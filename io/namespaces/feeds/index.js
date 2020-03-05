const Connection = require("../../../models/connections");
const Says = require("../../../models/says");
const mongoose = require("mongoose");

module.exports = (io) => {
    const users = {};
    io.of("/feeds").on("connection", (socket) => {
        socket.on("connection_", (authuserid) => {
            users[authuserid] = socket.id;
        });
        socket.on("get_feeds_update", (data) => {
            const { oldFeeds, authuserid } = data;
            Connection.find(
                {
                    $or: [
                        { follower: authuserid },
                        { mutual_connection: true, followee: authuserid }
                    ]
                },
                "follower followee",
                (err, data) => {
                    if (err) {
                        return;
                    }

                    let filteredData = data.map((entry) => {
                        const { follower, followee } = entry;
                        return follower === authuserid ? followee : follower;
                    });
                    filteredData.push(new mongoose.Types.ObjectId(authuserid));
                    Says.find({ said_by: { $in: filteredData } })
                        .populate("said_by", "name nickname")
                        .exec((err, gottendata) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (
                                oldFeeds.length === gottendata.length &&
                                JSON.stringify(oldFeeds) === JSON.stringify(gottendata)
                            ) {
                                console.log("still the same");
                                return;
                            } else {
                                const channel = users[authuserid];
                                socket.emit("got_new_feeds", gottendata);
                            }
                        });
                }
            );
        });
    });
};

// Connection.find(
//     {
//         $or: [
//             { follower: authuserid },
//             { mutual_connection: true, followee: authuserid },
//             { mutual_connection: true, follower: authuserid }
//         ]
//     },
//     "follower followee",
//     (err, data) => {
//         if (err) {
//             return res.json({
//                 error: true,
//                 message: "Something broke"
//             });
//         }

//         let filteredData = data.map((entry, index) => {
//             const { follower, followee } = entry;
//             console.log(follower, followee, typeof follower);
//             return follower == authuserid ? followee : follower;
//         });
//         filteredData.push(new mongoose.Types.ObjectId(authuserid));
//         console.log(filteredData, "authuserid: ", authuserid);

//         Says.find({ said_by: { $in: filteredData } })
//             .populate("said_by", "name nickname")
//             .exec((err, gottendata) => {

//                 if (err) {
//                     return res.json({
//                         error: "true",
//                         message: "something broke"
//                     });
//                 }
//                 res.json({
//                     feeds: gottendata
//                 });
//             });
//     }
// );
