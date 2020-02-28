const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },

    user2: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },

    messages: [{ type: Schema.Types.ObjectId, ref: "message" }]
});

module.exports = mongoose.model("conversation", conversationSchema);
