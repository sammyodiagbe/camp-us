const Connection = require("../../../models/connections");
const Says = require("../../../models/says");

module.exports = (io) => {
    const profileNamespace = io.of("/profile");
    profileNamespace.on("connection", (socket) => {
        socket.on("get_relationship", ({ authUserId, profile_id }) => {
            Connection.findOne(
                {
                    $or: [
                        { follower: authUserId, followee: profile_id },
                        { follower: profile_id, followee: authUserId }
                    ]
                },
                (err, any) => {
                    let isMutual = false;
                    let isFollowing = false;
                    if (err) {
                        return;
                    }
                    // if no relationship column has been made between the two user
                    if (!any) {
                        isMutual = false;
                        isFollowing = false;
                    } else {
                        if (any.mutual_connection == true) {
                            isMutual = true;
                            isFollowing = true;
                        } else {
                            // if no mutual relationship but the auth user follows
                            if (any.follower == authUserId) {
                                isFollowing = true;
                                isMutual = false;
                            }
                        }
                    }

                    // if there is a mutual relationship between userss
                    socket.emit("set_relationship", { isMutual, isFollowing });
                }
            );
        });

        // getting profile feeds
        socket.on("get_profile_feeds", ({ oldFeeds, profile_id }) => {
            Says.find({ said_by: profile_id })
                .populate({
                    path: "said_by",
                    select: ["name", "nickname", "email", "time_posted"]
                })
                .exec((err, says) => {
                    if (err) {
                        return;
                    }
                    if (
                        JSON.stringify(oldFeeds) === JSON.stringify(says) &&
                        oldFeeds.length === says.length
                    )
                        return;
                    socket.emit("set_profile_feeds", says.reverse());
                });
        });
    });
};
