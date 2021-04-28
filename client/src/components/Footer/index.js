import React from "react";
import "../../styles/Homepage.css";


export default function Footer() {
    return (
        <section className="section-class" id="footer">
            <div className="footer-content">
                <a href="https://github.com/MuhammedEkinci/MemePost-React" target="_blank">
                    <span><i class="fab fa-github"></i></span>
                </a>
                <a href="https://reactjs.org/" target="_blank">
                    <span><i class="fab fa-react"></i></span>
                </a>
                <p id="imgflip-line">Powered By<a href="https://imgflip.com/api" target="_blank"> imgflip.com</a></p>
                <span className="hr"></span>
                <br></br>
                <p className="copyright">©Muhammed Ekinci MemePost 2021</p>
            </div>
        </section>
    );
}