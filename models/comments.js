const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    time_of_comment: {
        type: Date,
        default: Date.now()
    },
    said_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
});

module.exports = mongoose.model("comment", commentSchema);
