module.exports = (io) => {
    const uniqueid = {};
    const chatNamespace = io.of("/chat");
    chatNamespace.on("connection", (socket) => {
        socket.on("user_connected", (data) => {
            const { user } = data;
            uniqueid[user] = socket.id;
        });

        socket.on("typing", (data) => {
            const { friend } = data;
            const channel = uniqueid[friend];
            socket.to(channel).broadcast.emit("typing");
        });

        socket.on("done_typing", (data) => {
            const { friend } = data;
            const channel = uniqueid[friend];
            socket.to(channel).broadcast.emit("done_typing");
        });

        socket.on("new_message", (data) => {
            const { friendid, body, time } = data;
            const channel = uniqueid[friendid];
            socket.to(channel).emit("new_message", data);
        });

        socket.on("disconnect", () => {});
    });
};
