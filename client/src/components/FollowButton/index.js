import React from 'react';
import {Button} from "react-bootstrap";
import "../../styles/Homepage.css";
import {useAuth} from "../../contexts/AuthContext";
import API from '../../utils/API';

export default function FollowButton (props){

    const {currentUser} = useAuth();

    // function that follows memer
    const followMemer = (event) => {
        event.preventDefault();
        console.log(props.followUserId);
        console.log(currentUser.email.split("@")[0]);

        const followUser = {
            followingUser: props.followUserId,
            currentUser: currentUser.email.split("@")[0]
        };
        API.followMemer(followUser)
        .then(console.log("Following"))
        .catch((err) => console.log(err));

    }
    return (
        <div>
            <Button 
                className="follow-btn" 
                variant="outline-primary" 
                size="sm"
                onClick={followMemer}>
                    Follow
            </Button>
        </div>
    );
}