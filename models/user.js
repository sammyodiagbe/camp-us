const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
});

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, 11);
};

module.exports = mongoose.model("user", userSchema);
