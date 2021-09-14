import React, {useState, useEffect} from "react"
import {Card, Button, Container, Row, Col, Image} from "react-bootstrap";
import API from "../utils/API";
import {useAuth} from "../contexts/AuthContext";
import CommentButton from "../components/CommentButton";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";

import "../styles/Homepage.css";
import FollowButton from "../components/FollowButton";

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

export default function HomePage() {

    const [memes, setMemes] = useState([]); //will store memes retrieved from database
    //const [loading, setLoading] = useState(false);
    const [isMemeSaved, setIsMemeSaved] = useState([]); //will hold state for all memes that are saved or not saved
    const [visibile, setVisible] = useState(3);
    const {currentUser} = useAuth();
    // These bottom two states are for material-ui alert
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getMemesToPost();
    }, []);

    // When load more button is clicked fetch more memes
    const loadMore = () =>{
        setVisible((previousVal) => previousVal + 5);
    };

    //get current date of meme being saved 
    //to filter in front end
    function getDateAndTime(){
        let date = new Date()
        return date;
    };

    const getMemesToPost = () => {

        API.getMemes()
        .then(({data}) => {setMemes(data); 
            // this will fill the IsMemeSaved state array 
            //with whatever the isMemeSaved value is in the CreatedMeme database
            setIsMemeSaved(data.map(x => x.isMemeSaved))
        })
        .catch((err) => console.log(err));
    };



    //I am trying to save not only the user but also 
    //push the meme that the user is saving into the memesLiked array in mongodb
    //and to filter the saved meme page by the current logged in users memes saved
    const handleMemeSave = (memeId) => {
        
        // find the meme that user is trying to save along with all its data
        const currentMeme = memes.find(data => data._id === memeId);

        //get current date and time of meme saved
        const dateMemeIsSaved = {
            current_date: getDateAndTime()
        }

        let date = dateMemeIsSaved.current_date

        let memeToSave = {
            currentLoggedUser: currentUser.email.split("@")[0],
            title: currentMeme.title,
            meme: currentMeme.meme,
            user: currentMeme.user,
            saved_date: date
        };

        API.saveMeme(memeToSave)
        .then(setOpen(true))
        .catch((err) => console.log(err));
    }

    // Change the image of the save button 
    // only for the meme you are saving
    function changeButtonImg(saving_meme_index, memeId){
  
        // This line of code will change the state depending on the index of the useState 
        // Then it will slice the rest of the array 
        //and set the copy of that sliced array into the setIsMemeSaved
        setIsMemeSaved(current => [...current.slice(0, saving_meme_index), true, ...current.slice(saving_meme_index+1)]);
        API.changeSavedState( currentUser.email.split("@")[0], memeId)
        .catch((err) => console.log(err));
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    function followMemer(name){
        console.log(name);
    }

    return (
        <>
        <Container fluid className="meme justify-content-center">
            <Row>
                <Col lg={12}>
                    {memes.slice(0, visibile).map((memeToShow, i) => {
                        return (
                            <>
                                <Card key={memeToShow._id} className="meme-card">
                                    <Card.Title className="meme-title">{memeToShow.title}</Card.Title>
                                    <Card.Body className="meme-card-body">
                                        <Image src={memeToShow.meme} alt="meme-pic" className="meme-picture w-100"fluid/>
                                    </Card.Body>
                                    <Row>
                                        <Col size={12}>
                                            <FollowButton currentMemeArtist={memeToShow.user}/>
                                            <h4 className="meme-artist">Made By: <NavLink className="meme-artist-name" to={memeToShow.user !== currentUser.email.split("@")[0]? "/profile/" + memeToShow.user : "/profile"}>{memeToShow.user}</NavLink></h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size={3}>
                                            <CommentButton currentMemeId={memeToShow._id} />
                                        </Col>
                                        <Col size={3} >
                                            {/*Need to work on like and dislike button */}
                                            {/* <LikeButton />
                                            <DislikeButton /> */}
                                            <Button variant="btn btn-outline save-btn" 
                                                onClick={() => {changeButtonImg(i, memeToShow._id); handleMemeSave(memeToShow._id)}}
                                            >
                                                {isMemeSaved[i] 
                                                ? <i className="fas fa-bookmark"></i> 
                                                : <i className="far fa-bookmark"></i>}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                                <br></br>
                            </>
                        );
                    })}
                    <Button
                        id="load-more-btn"
                        variant="outline-primary"
                        size="sm"
                        className="load-more-btn"
                        onClick={loadMore}
                    >
                        More Memes!
                    </Button>
                </Col>
            </Row>
            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="success">
                        Meme Saved!!
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    </>
    );
}