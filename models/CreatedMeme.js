const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createdMemeSchema = new Schema({
    title: {
        type: String,
        required: false,
        min: [1]
    },
    meme: {
        type: String,
        required: false
    },
    user: {
        type:String,
        required: false
    },
    posted_date: {
        type: Date,
        required: false
    },
    isMemeSaved: {
        type: Boolean,
        default: false
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
});


const CreatedMeme = mongoose.model("CreatedMeme", createdMemeSchema);

module.exports = CreatedMeme;