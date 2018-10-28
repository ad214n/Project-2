const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

const Gym = mongoose.model("Gym", GymSchema);
module.exports = Gym;