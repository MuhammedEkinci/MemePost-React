import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentButton from "../components/CommentButton";
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory, NavLink} from "react-router-dom";
import "../styles/ProfilePage.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";

//profile temp
import ProfileImage from "../images/profileImg.png";


export default function UserProfile(){

    const { userid } = useParams();

    return (
        <h1>User profile page{userid}</h1>
    )
}