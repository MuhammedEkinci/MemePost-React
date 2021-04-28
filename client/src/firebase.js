import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBxGY9y7uNMuBmigmn7MuaM9GK-Gk36D_E",
    authDomain: "meme-post-production.firebaseapp.com",
    databaseURL: "https://meme-post-production-default-rtdb.firebaseio.com",
    projectId: "meme-post-production",
    storageBucket: "meme-post-production.appspot.com",
    messagingSenderId: "1078895995556",
    appId: "1:1078895995556:web:c418fc3efacc9bf4e19431"
}) 


export const auth = app.auth()
export default app
