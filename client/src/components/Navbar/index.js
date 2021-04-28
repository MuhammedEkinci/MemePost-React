import React from "react";
import {NavLink} from "react-router-dom";
import Trollface from "../pictures/Trollface.png"
import "../../styles/Navbar.css";

export function NavBar() {


  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark meme-navbar">
        <button className="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/homepage">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/create">Create</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/saved">Saved</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav justify-content-center mr-auto">
                <NavLink className="navbar-brand" to="/homepage">Meme-Post</NavLink>
                <img src={Trollface} alt="troll-face" className="d-inline-block" style={{width: "50px"}}></img>

            </ul>
            <ul className="navbar-nav justify-content-end">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default NavBar;