import React from "react";
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {

    const {currentUser} = useAuth();

    //If a perosn is logged in then load all the component info
    // Otherwise if there is no one logged in then go to login page
    return (
        <Route 
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >

        </Route>
    );
}