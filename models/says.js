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
    talker: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Says", saysSchema);
