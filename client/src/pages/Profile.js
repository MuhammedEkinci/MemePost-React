import React, { useState, useEffect } from "react";
import {Card, Button, Container, Row, Col, Image} from "react-bootstrap";
import CommentButton from "../components/CommentButton";
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory, NavLink} from "react-router-dom";
import "../styles/ProfilePage.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";

import ProfileImage from "../images/profileImg.png";

// functions for material-ui
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Profile() {
    // These bottom two states are for material-ui alert
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [error, setError] = useState("");
    const [memes, setMemes] = useState([]);
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    useEffect(() => {
        getProfileMemes(currentUser.email.split("@")[0]);
    }, [currentUser.email.split("@")[0]]);

    const getProfileMemes = (currentLoggedIn) => {
        API.getMyMemes(currentLoggedIn)
        .then(({data}) => {setMemes(data)})
        .catch((err) => console.log(err));
    };

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            alert(<Alert variant="danger">Failed To Log Out!</Alert>)
        }
    }

    function deleteMeme(memeId){
        console.log(memeId)
        API.deleteMyMeme(memeId)
        .then(() => getMyMemes(currentUser.email.split("@")[0]))
        .then(setOpen(true))
        .catch((err) => console.log(err));
    }

    const handleClose = (event, reason) => {
        setOpen(false);
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
                                <h2 class="card-title mb-0">{currentUser.email.split("@")[0]}</h2>
                                <h5 className="mb-2"><strong>Email: </strong>{currentUser.email}</h5>
                                <div>
                                    <NavLink to="/update-profile" className="btn btn-primary btn-sm">Update Profile</NavLink>
                                    <Link className="btn btn-primary btn-sm logout-btn" onClick={handleLogout} style={{marginLeft: "10px"}}>Log Out</Link>
                                </div> 
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
                        <h1 className="section-title" style={{textAlign: "center"}}>My Memes</h1>
                        {memes.length === 0 ? <h1>Go Back And <NavLink to="/create">Make</NavLink> Some Memes!</h1> : memes.map((memeToShow) => {
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
                                            <Col size={3}>
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm" 
                                                    className="save-btn" 
                                                    style={{marginRight: "5px"}}
                                                    onClick={() => deleteMeme(memeToShow._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <br></br>
                                </>
                            );
                        })}
                    </Col> 
                </Row>
                <div className={classes.root}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity="success">
                            You Meme was Deleted!
                        </Alert>
                    </Snackbar>
                </div>
            </Container>
        </div>
    )
}