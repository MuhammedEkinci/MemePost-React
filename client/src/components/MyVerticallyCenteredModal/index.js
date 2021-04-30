import React from 'react';
import {Container, Form, Button, Modal, Card, Row, Col, Image} from "react-bootstrap";
import CommentButton from '../CommentButton';
import {useAuth} from "../../contexts/AuthContext";
import "../../styles/Homepage.css";

export default function MyVerticallyCenteredModal(props) {  

    const {currentUser} = useAuth();

    return (
        <Container fluid>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="preview-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Preview
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="meme-card">
                        <Card.Title className="meme-title">{props.memetitle}</Card.Title>
                        <Card.Body className="meme-card-body">
                            <Image src={props.memeimg} alt="meme-pic" className="meme-picture w-100" fluid />
                        </Card.Body>
                        <Row>
                            <Col size={12}>
                                <h4 className="meme-artist">Made By: <span className="meme-artist-name">{currentUser.email.split("@")[0]}</span></h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={3}>
                                <CommentButton />
                            </Col>
                            <Col size={3}>
                                <Button variant="btn outline-primary save-btn"><i className="far fa-bookmark"></i></Button>
                            </Col>
                        </Row>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
      
    );
}
