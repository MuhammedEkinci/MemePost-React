import axios from "axios";

export default {
    // Get all Memes
    getMemes: function() {
        return axios.get("/api/createdMeme");
    },
    //get one meme
    getMeme: function(id) {
        return axios.get("/api/createdMeme/" + id);
    },
    changeSavedState: function(currentUser, memeId) {
        return axios.get("/api/save_meme/" + currentUser + "/" + memeId);
    },
    //delete meme
    deleteMyMeme: function(id) {
        return axios.delete("/api/delete-my-meme/" + id);
    },
    //saves a meme to database
    createMeme: function(memeData) {
        //console.log(memeData)
        return axios({
            method: "post",
            url: "/api/createdMeme",
            data: memeData
        })
    },
    // Get user memes for profile page
    getMyMemes: function(currentUser){
        //console.log(currentUser);
        return axios.get("/api/my-Memes/" + currentUser)
    },
    // post saved meme
    saveMeme: function(memeData) {
        return axios({
            method: "post",
            url: "/api/savedMeme",
            data: memeData
        })
    },
    //unsave a meme 
    unsaveMeme: function(currentUser ,memeId) {
        //console.log(memeId)
        console.log(currentUser)
        return axios.delete("/api/savedMeme/" + currentUser + "/" + memeId);
    },
    //get saved Memes from api
    getSavedMemes: function(currentUser) {
        //console.log(currentUser);
        return axios.get("/api/savedMeme/" + currentUser);
    },
    postComment: function(comment){
        //console.group(comment);
        return axios({
            method: "post",
            url: "/api/post_comment",
            data: comment
        });
    },
    getComments: function(memeId){
        return axios.get("/api/get_comment/" + memeId);
    },
    followMemer: function(followData){
        return axios({
            method: "post",
            url: "/api/follow",
            data: followData
        });
    }
};