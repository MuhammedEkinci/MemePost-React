import React, {useState, useEffect} from "react"
import {Card, Button, Container, Row, Col, Image} from "react-bootstrap";
import API from "../utils/API";
import {useAuth} from "../contexts/AuthContext";
import "../styles/Homepage.css";
//import CommentButton from "../components/CommentButton";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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

export default function LikedMemePage() {
    const [memes, setMemes] = useState([]); //use state to hold memes saved in the SavedMeme database
    const {currentUser} = useAuth();

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getMemesToPost();
    }, []);

    const getMemesToPost = () => {
        API.getSavedMemes(currentUser.email.split("@")[0])
        .then(({data}) => setMemes(data))
        .catch((err) => console.log(err));
    }

    // We are going to pass the current Logged user
    // along with the meme they are trying to unsave
    //to the unsaveMeme function
    async function handleDeleteMeme(memeId) {
        //console.log(memeId);

        var user = {
            currentLoggedUser: currentUser.email.split("@")[0]
        }
        //get the value from user object 
        //and put the currentLoggedUser value in this variable
        //then send this in params instead
        var loggedUser = user.currentLoggedUser

        API.unsaveMeme(loggedUser, memeId)
        .then(() => getMemesToPost())
        .then(setOpen(true))
        .catch((err) => console.log(err));
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <Container fluid className="meme justify-content-center" >
            <Row>
                <Col lg={12} sm={12}>   
                    {/*Iterate through memes first in order to access memesSaved*/}
                    {memes.map((memeToShow, i) => {
                        return (
                            <>
                                <div key ={i}>
                                    {/*First we check if the user has any memes saved*/}
                                    {/* now you can iterate through the memesSaved array which holds all the user liked memes */}
                                    {/* similar to how a nested for loop works */} 
                                    {memeToShow.memesSaved.length === 0 ? <h1>Go back and save some memes</h1> : 
                                    memeToShow.memesSaved.map(function(role, i){
                                        return (
                                            <>
                                                <Card key={i} className="meme-card">
                                                    <Card.Title className="meme-title">{role.title}</Card.Title>
                                                    <Card.Body className="meme-card-body">
                                                        <Image src={role.meme} alt="meme-pic" className="meme-picture w-100"fluid/>
                                                    </Card.Body>
                                                    <Row>
                                                        <Col size={12}>
                                                            <h4 className="meme-artist">Made By: <span className="meme-artist-name">{role.user}</span></h4>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col size={3} >
                                                            <Button 
                                                                variant="btn btn-outline save-btn" 
                                                                onClick={() => handleDeleteMeme(role._id)}>
                                                                <i className="fas fa-bookmark"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                                <br></br>
                                            </>
                                        )
                                    })}
                                </div>
                            </>
                        );
                    })}
                </Col>
            </Row>
            {/* Material-ui SnackBar */}
            <div className={classes.root}>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity="success">
                            UnSaved Meme!!
                        </Alert>
                    </Snackbar>
                </div>
        </Container>
    );
}