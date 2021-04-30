import React, { useEffect, useState } from "react"
import {Container, Form, Button} from "react-bootstrap";
import "../styles/CreateMemePage.css";
import Meme from "../components/Meme/";
import MyVerticallyCenteredModal from "../components/MyVerticallyCenteredModal";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import {useAuth} from "../contexts/AuthContext";
import API from "../utils/API";
import {useHistory} from "react-router-dom";

const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
    return '?' + params.join("&")
}
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

export default function CreateMemePage() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [templates, setTemplates] = useState([]); //tmeplates stores all the meme img's retrieved from API
    const [template, setTemplate] = useState(null); //template stores which image the user chose to use
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [title, setTitle] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const [previewImg, setPreviewImg]= useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const history = useHistory();

    //to get the current user
    const {currentUser} = useAuth();

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(x => x.json().then(res => setTemplates(res.data.memes))
        );
    }, []);

    
    const handleClose = (event, reason) => {
        setOpen(false);
    };

    //Get current date of meme being made
    function getDateAndTime(){
        let date = new Date()

        return date;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("pressed");

        const params = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: "MemePost",
            password: "memePost001"

        }

        if(topText === "" || bottomText === "" || title === ""){
            setOpen(true);
        } else {
            //will take all the parameters needed to make the meme and send it to their api
            const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);

            //url of finished meme from API
            const data = await response.json()
            console.log(data.data.url);

            //get the current user
            const userEmail = {
                user: currentUser.email.split("@")[0]
            }

            //get current date and time of meme created
            const dateMemeIsMade = {
                current_date: getDateAndTime()
            }

            let date = dateMemeIsMade.current_date

            if(title && data && userEmail) {
                let memes = {
                    title: title,
                    meme: data.data.url,
                    "user": userEmail.user,
                    posted_date: date
                }
                API.createMeme(memes)
                .then(history.push("/homepage"))
                .catch((err) => console.log(err))
            } 
        }
    }

    //function to preview meme before post
    async function previewMeme() {
        console.log("pressed");

        const params = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: "MemePost",
            password: "memePost001"

        };

        if(topText === "" || bottomText === "" || title === ""){
            setOpen(false);
        } else {
            const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);

            const data = await response.json()

            const userEmail = {
                user: currentUser.email.split("@")[0]
            }

            if(title && data && userEmail){
                let memes = {
                    title: title,
                    meme: data.data.url,
                    "user": userEmail.user
                };
                setPreviewImg(memes.meme);
                setPreviewTitle(memes.title);
            }
        }
    }
    return (
        <div className="create-meme-container">
            <h1 className="create-meme-title">Create a Meme</h1>
            <Container fluid className="meme-display-container">
                {template && (
                    <div className="chosen-meme-display-area meme justify-content-center" style={{width: "300px"}}>
                        <Meme template={template}/>
                        <Form onSubmit={handleSubmit} style={{marginTop: '10px'}}>
                            <Form.Group id="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control placeholder="Title of Meme" onChange={e => setTitle(e.target.value)} value={title}/>
                            </Form.Group>
                            <Form.Group id="top-text">
                                <Form.Label>Top-Text</Form.Label>
                                <Form.Control placeholder="top-text" onChange={e => setTopText(e.target.value)} value={topText}/>
                            </Form.Group>
                            <Form.Group id="bottom-text">
                                <Form.Label>Bottom-Text</Form.Label>
                                <Form.Control  placeholder="bottom-text"  onChange={e => setBottomText(e.target.value)} value={bottomText}/>
                            </Form.Group>
                            <Button className="btn btn-primary" type="submit">Create Meme</Button>
                            <Button className="btn btn-primary" id="preview-btn" onClick={() => {setModalShow(true); previewMeme()}}>Preview Meme</Button>
                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                memeimg={previewImg}
                                memetitle={previewTitle}
                            />
                        </Form>
                  </div>
                )}
                {!template && templates.map((template) => {
                    return (         
                        <img             
                            className="meme-img ml-2 mt-2" 
                            key={template.id} 
                            src={template.url} 
                            alt={template.name}
                            onClick={() => {
                                setTemplate(template)
                            }}
                        />
                    );
                })}
                <div className={classes.root}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity="error">
                            Please fill in all inputs!
                        </Alert>
                    </Snackbar>
                </div>
            </Container>
        </div>
    );
}