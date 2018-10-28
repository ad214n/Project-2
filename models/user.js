const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    goals: {
        type: String,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;