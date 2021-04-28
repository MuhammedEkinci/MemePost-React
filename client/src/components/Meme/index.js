import React from "react";
import  "../../styles/CreateMemePage.css";

export default function Meme({template, onCLick }) {
    return (
        <img 
            className="ml-2 mt-2"
            style={{width: '100%', height: '100%'}} 
            key={template.id} 
            src={template.url} 
            alt={template.name}
            onClick={onCLick}
        />
    );
}