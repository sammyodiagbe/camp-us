const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        required: true
    },
    followee: {
        type: Schema.Types.ObjectId,
        required: true
    },
    mutual_connection: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Connection", connectionsSchema);
