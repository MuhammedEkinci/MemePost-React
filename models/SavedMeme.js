const mongoose = require("mongoose");
const CreatedMeme = require("./CreatedMeme");
const Schema = mongoose.Schema;

const SavedMemeSchema = new Schema({
    currentLoggedUser: {
        type: String,
        required: true,
        unique: true
    },
    memesSaved: [
        {
            title: {
                type: String,
                required: true,
                min: [1]
            },
            meme: {
                type: String,
                required: true
            },
            user: {
                type:String,
                required: true
            },
            saved_date: {
                type: Date,
                required: false
            }
        },
    ],
});

const SavedMeme = mongoose.model("SavedMeme", SavedMemeSchema);

module.exports = SavedMeme;
