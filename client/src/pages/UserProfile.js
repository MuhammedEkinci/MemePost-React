import React, { useState, useEffect } from "react";
import {Card, Button, Container, Row, Col, Image} from "react-bootstrap";
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
import FollowButton from "../components/FollowButton";


export default function UserProfile(){

    const { userid } = useParams();
    const [memes, setMemes] = useState([]);
    const {currentUser, logout} = useAuth();

    useEffect(() => {
        getProfileMemes(userid);
    }, [userid]);

    const getProfileMemes = (profileName) => {
        API.getMyMemes(profileName)
        .then(({data}) => {setMemes(data)})
        .catch((err) => console.log(err));
    };

    return (
        <div className="profile-page">
            <Container fluid style={{marginTop: "2rem"}}>
                <Row>
                    <Col sm={12} md={4} lg={4} >
                        <div className="card mb-3" id="profile-card">
                            <div className="card-body text-center">
                                <img 
                                    src={ProfileImage}
                                    alt="profile-image" 
                                    class="img-fluid rounded-circle mb-2" 
                                    width="128"
                                    height="128"
                                />
                                <h2 class="card-title mb-0">{userid}</h2>
                                <FollowButton followUserId={userid}/>
                            </div>
                        </div>
                        <div className="card mb-3" id="profile-card">
                            <div className="card-body">
                                <h2 class="card-title mb-0">Following: 50</h2>
                                <hr/>
                            </div>
                        </div>
                        <div className="card mb-3" id="profile-card">
                            <div className="card-body">
                                <h2 class="card-title mb-0">Followers: 33</h2>
                                <hr/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={4} lg={4} >
                        <h1 className="section-title" style={{textAlign: "center"}}>Memes</h1>
                        {memes.length === 0 ? <h1>{userid} has no memes!</h1> : memes.map((memeToShow) => {
                            return (
                                <>
                                    <Card key={memeToShow._id} className="meme-card">
                                        <Card.Title className="meme-title">{memeToShow.title}</Card.Title>
                                        <Card.Body className="meme-card-body">
                                            <Image src={memeToShow.meme} alt="meme-pic" className="meme-picture w-100"fluid/>
                                        </Card.Body>
                                        <Row>
                                            <Col size={12}>
                                                <h4 className="meme-artist">Made By: <span className="meme-artist-name">{memeToShow.user}</span></h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size={3}>
                                                <CommentButton currentMemeId={memeToShow._id}/>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <br></br>
                                </>
                            );
                        })}
                    </Col> 
                </Row>
            </Container>
        </div>
    )
}