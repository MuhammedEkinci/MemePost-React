import React, { useEffect, useState, useRef } from "react";
import {useHistory} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import TextFeild from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import "../../styles/Homepage.css";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {useAuth} from "../../contexts/AuthContext";

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

export default function CommentButton(props) {

    const classes = useStyles();
    const [warnOpen, setWarnOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const [comment, setComment] = useState('');
    const [CommentList, setCommentList] = useState([]);
    const [memeId, setMemeId] = useState('');
    const [visibile, setVisible] = useState(3);

    const {currentUser} = useAuth();
    const history = useHistory();


    const descriptionElementRef = useRef(null);
    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    // When load more button is clicked fetch more memes
    const loadMore = () =>{
        setVisible((previousVal) => previousVal + 10);
    };

    const loadLess = () =>{
        setVisible((previousVal) => previousVal - 5);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    //instead fo using useEffect (because it didnt work for what I needed it to do) from react to render the comments
    //I am using simple recursion so that when the comment button on the homepage is pressed
    // It will send an axios get request along with the current id of meme (given from comments.data[0].memeId)
    // After it gets the comments and sets them in the corresponding useState it will fire of itself 
    //simulating an infinite render similar to useEffect
    function getCommentsToPost(id){
        API.getComments(id)
        .then((comments) => {setCommentList(comments.data); getCommentsToPost(comments.data[0].memeId)})
        .catch((err) => console.log(err));
    }
    
    // when this is called it will sugmit a comment
    const submitComment = (event) => {
        event.preventDefault();

        // console.log(props.currentMemeId)
        // console.log(comment);

        let postComment = {
            memeId: props.currentMemeId,
            whoCommented: currentUser.email.split("@")[0],
            comment: comment
        };

        API.postComment(postComment)
        .then((response) => {
            //console.log(response.data);
            if(response.data){
                setComment("")
                console.log("Working I guess");
            } else {
                console.log("Didnt work")
            }
        })
        .catch((err) => console.log(err));
    };

    const setCurrentMemeID = (meme_id) => {
        setMemeId(props.currentMemeId);
    }

    const handleWarningClose = (event, reason) => {
        setWarnOpen(false);
    };
    return (
        <div>
            <Button color="primary"
                onClick = {() => {
                    setOpen(true); 
                    setScroll('paper'); 
                    setCurrentMemeID(props.currentMemeId); 
                    getCommentsToPost(props.currentMemeId)}}
                >
                    <i className="far fa-comment-alt" style={{paddingRight: "2px"}}></i>
                    Comment
                </Button>
            <Dialog className="dialog"
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <form>
                        <TextFeild 
                            id="standard-textarea"
                            label="Comment Section"
                            placeholder="Write a comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} 
                        />
                        <Button 
                            className="submit-comment-btn"
                            color="primary" 
                            style={{marginLeft: "5px"}} 
                            onClick={submitComment}
                            >
                                Comment
                        </Button>
                    </form>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {CommentList && CommentList.slice(0, visibile).map((comment, index) => (
                            (!comment.responseTo &&
                                <React.Fragment>
                                    <p><strong>{comment.whoCommented}:</strong>  {comment.comment}</p>                              
                                </React.Fragment>
                            )
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button small="small" onClick={loadMore} color="primary">
                        Load More
                    </Button>
                    <Button small="small" onClick={loadLess} color="primary">
                        Show Less
                    </Button>
                    <Button small="small" onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={classes.root}>
                <Snackbar open={warnOpen} autoHideDuration={6000} onClose={handleWarningClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="danger">
                        You Must Be Signed In Order To Comment!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}