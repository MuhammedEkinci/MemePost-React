import React from 'react';
import {Button} from "react-bootstrap";
import "../../styles/Homepage.css";
import {useAuth} from "../../contexts/AuthContext";

export default function FollowButton (props){

    const {currentUser} = useAuth();

    // function that follows memer
    const followMemer = (event) => {
        event.preventDefault();
        console.log(props.followUserId);
        console.log(currentUser.email.split("@")[0])
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