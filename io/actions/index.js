module.exports = (IO) => {
    IO.on("connection", (socket) => {
        socket.on("hello", () => {
            socket.emit("answer");
        });
    });
};
