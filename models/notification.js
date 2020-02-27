const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    verb: {
        type: String,
        required: true
    },
    bywhom: {
        type: [{ type: Schema.Types.ObjectId }],
        required: true,
        default: []
    },
    towhom: {
        type: Schema.Types.ObjectId,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    ref: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("notification", notificationSchema);
