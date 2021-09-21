
// Requiring necessary npm packages
const compression = require("compression");
const express = require("express");
const mongoose = require("mongoose");
const CreatedMeme = require("./models/CreatedMeme.js");
const SavedMeme = require("./models/SavedMeme.js");
const Comments = require("./models/Comments.js");
const FriendsList = require("./models/FriendsList.js");

const app = express();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001;

app.use(compression({ filter: shouldCompress }))
 
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
 
  // fallback to standard filter function
  return compression.filter(req, res)
}


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://MuhammedEkinci:*Tbn58kpm@cluster0.e9fkz.mongodb.net/memepost_db?retryWrites=true&w=majority', 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start the API server
app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

//Get memes from Database to homepage
app.get("/api/createdMeme", (req, res) => {
  //console.log("route hit!!");
  CreatedMeme.find({}).sort({ posted_date: -1})
  .then((error, data) => {
    if(error) {
      res.send(error)
    } else {
      //console.log(data)
      res.json(data);
    }
  })
});

//post memes into Database
app.post("/api/createdMeme", (req, res) => {
  console.log("You just made a meme!!!");
  CreatedMeme.create(req.body).then((error, data) => {
    console.log("save meme SUCCESS!!!!");
    if(error) {
      res.send(error)
    } else {
      //console.log(data)
      res.json(data);
    }
  });
});

// Route that gets the current users made memes to display on profile page
app.get("/api/my-memes/:currentUser", (req, res) => {
  CreatedMeme.find({user: req.params.currentUser}).sort({posted_date: -1})
  .then((error, data) => {
    if(error) {
      res.send(error)
    } else {
      //console.log(data)
      res.json(data);
    }
  });
});

//Route that deletes your memes from the profile page
app.delete("/api/delete-my-meme/:id", (req, res) => {
  CreatedMeme.deleteOne({_id: req.params.id})
  .then((error, data) => {
    if(error) {
      res.send(error)
    } else {
      console.log(data)
      return res.json(data);
    }
  });
})

// When meme gets saved update the state in the database to true 
//so that whenever they go to home the saved state is always true unless they unsave
app.get("/api/save_meme/:currentUser/:memeId", (req, res) => {
  CreatedMeme.updateOne(
    {_id: req.params.memeId}, 
    {$set: {
      isMemeSaved: true
    }}
  ).then(dbmodel => res.json(dbmodel))
  .catch(err => res.status(422).json(err));
});

// When user posts a comment on a meme post then this route is called
app.post("/api/post_comment", (req, res) => {
  Comments.create(req.body).then((error, comment) => {
    if(error) {
      res.send(error)
    } else {
      console.log(comment)
      res.json(comment);
    }
  })
});

// Route to get comments from database 
app.get("/api/get_comment/:memeId", (req, res) => {
  Comments.find({memeId: req.params.memeId}).sort({ createdAt: -1})
  .then((error, comments) => {
    if(error){
     return res.send(error)
    } else {
      return res.json(comments);
    }
  })
})

//Get memes from Database to saved page depending on which current user is logged in
//along with the memes that they saved
app.get("/api/savedMeme/:currentUser", (req, res) => {
  SavedMeme.find({currentLoggedUser: req.params.currentUser}).sort({'memesSaved.saved_date': -1})
  .then(memes => {
    // console.log(req.params.currentUser);
    // console.log(memes)
    if(!memes){
      console.log("No saved memes found!!")
      return res.json([]);
    }
    else {
      //console.log("Memes saved found")
      return res.json(memes);
    }
  });
});


//Save a meme into memesSaved array in SavedMeme database
//By finding the currentLoggedUser and pushing meme into array
app.post("/api/savedMeme", (req, res) => {
  SavedMeme.findOneAndUpdate({currentLoggedUser: req.body.currentLoggedUser}, {$push:{memesSaved: req.body}})
  .then(user => {  
    //if there is no user with that name in database then create a new user
    //along with an empty array of memesSaved
    //Then save the meme into the array along with the new user
    if(!user){
      console.log("User Not Found!");
      const newUser = new SavedMeme({
        currentLoggedUser: req.body.currentLoggedUser,
        memesSaved: [
          {
            title: req.body.title,
            meme: req.body.meme,
            user: req.body.user,
            saved_date: req.body.saved_date
          }
        ]
      });
      newUser.save()
      .then(x =>res.json(x))
      .catch(err => console.log(err));
    }
    //if there is already a person with this logged in name 
    //then just update the memesSaved array and push the new meme   
    else {
      console.log("User Found!!");
      return res.json(user);
      /*Add code here to check if a meme the user already saved 
      does not get saved again*/

    }
  })
})

//delete saved meme from savedMeme database
app.delete("/api/savedMeme/:currentUser/:memeId", (req, res) => {
  SavedMeme.updateOne(
    {currentLoggedUser: req.params.currentUser}, 
    {$pull: {"memesSaved": {_id: req.params.memeId}}})
    .then((error, data) => {
      if(error) {
        res.send(error)
      } else {
        console.log(data)
        return res.json(data);
      }
    });
});

// follow users route that adds user to followers and following database
app.post("/api/follow", (req, res) => {
  //update followers array 

  console.log(req.body.followingUser);
  console.log(req.body.currentUser);
  // FriendsList.findOneAndUpdate(
  //   {user: req.body.followingUsername}, 
  //   {$push: {followers: req.body.user}
  // }).then(user => {
  //   if(!user){
  //     const newUserToFollow = new FriendsList({
  //       user: req.body.followingUsername,
  //       following: [
  //         {
  //           followingUsername: req.body.followingUsername,

  //         }
  //       ],
  //       followers: [
  //         {
  //           followerUsername: req.body.followingUsername
  //         }
  //       ]
  //     });
  //     newUserToFollow.save()
  //     .then(x =>res.json(x))
  //     .catch(err => console.log(err));
  //   }
  // })
});

// unfollow users route that removes users from database
// app.put("/api/follow", (req, res) => {
//   FriendsList.findOneAndUpdate({user: req.body.followingUsername}, 
//     {
//       $push: {followers: req.body.user}
//     },
//     {
//       new: true
//     }, (err, result) => {
//       if(error){
//         return res.status(422).json({error:err})
//       }
//       FriendsList.findOneAndUpdate({user:req.body.user}, 
//         {
//           $push:{following: req.body.followingUsername}
//         }, {new:true}).then(result => {
//           return res.json(result)
//         }).catch(err=> {
//           return res.status(422).json({error: err});
//         });
//     });
// });

// app.delete("/api/unfollow", (req, res) => {
//   FriendsList.findOneAndUpdate({user: req.body.followingUsername}, 
//     {
//       $pull: {followers: req.body.user}
//     },
//     {
//       new: true
//     }, (err, result) => {
//       if(error){
//         return res.status(422).json({error:err})
//       }
//       FriendsList.findOneAndUpdate({user:req.body.user}, 
//         {
//           $pull:{following: req.body.followingUsername}
//         }, {new:true}).then(result => {
//           return res.json(result)
//         }).catch(err=> {
//           return res.status(422).json({error: err});
//         });
//     });
// });