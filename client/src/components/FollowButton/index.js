import React from 'react';
import {Button} from "react-bootstrap";
import "../../styles/Homepage.css";

export default function FollowButton (props){

    function followMemer(name){
        console.log(name);
    }
    return (
        <div>
            <Button id="star-memer-btn" onClick={() => {followMemer(props.currentMemeArtist)}}><i class="fas fa-star"></i></Button>
        </div>
    );
}