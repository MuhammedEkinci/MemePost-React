const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    memeId: {
        type: String,
        require: true
     },
    comment: {
        type: String,
        require: true,
        min: [1]
    },
    whoCommented: {
        type: String,
        require: true
    }
},{timestamps: true});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;