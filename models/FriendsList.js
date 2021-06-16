const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    user: 
    {
        type:String,
        require: true
    },
    following: [
        {
            followingUsername: {
                type: String,
                required: true
            }
        }
    ],
    followers: [
        {
            followerUsername: {
                type: String,
                required: true
            }
        }
    ]
});

const FriendsList = mongoose.model("FriendsList", FriendsSchema);

module.exports = FriendsList;