import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert  } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
  
    function handleSubmit(event) {
      event.preventDefault();
  
      //Password confirmation to check if the password is == to the re-entered password
      if(passwordRef.current.value !== passwordConfRef.current.value) {
        return setError("Passwords do not match");
      }

      //if the changes email is different than the current email push to promises 
      //also push new password into promises
      const promises = [];
      setLoading(true);
      setError("");

      if(emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value));
      }
      if(passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
      }
      Promise.all(promises)
        .then(() => {
            history.push("/profile")
        })
        .catch(() => {
            setError("Failed to update profile")
        })
        .finally(() => {
            setLoading(false);
        })
    }
  
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Card>
                        <Card.Body>
                        <h2 className="text-center md-4">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep the same"/>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Re-Enter Password</Form.Label>
                                <Form.Control type="password" ref={passwordConfRef}  placeholder="Leave blank to keep the same"/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">Update</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Link to="/profile">Cancle</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}
  