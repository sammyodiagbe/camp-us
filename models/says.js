const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saysSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    time_posted: {
        type: Date,
        default: Date.now()
    },
    said_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    comments: [Schema.Types.ObjectId],
    likes: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Says", saysSchema);
