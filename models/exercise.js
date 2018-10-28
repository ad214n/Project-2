const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;