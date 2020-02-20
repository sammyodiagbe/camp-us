const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    body: {
        type: String,
        required: true
    },

    sender: {
        type: Schema.Types.ObjectId,
        required: true
    },

    sent_on: {
        type: Date,
        default: new Date(Date.now())
    },

    seen: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("message", messageSchema);
