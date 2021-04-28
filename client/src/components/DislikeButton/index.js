import React from "react";
import { Button} from "react-bootstrap";

class DislikeButton extends React.Component {

    state = {
        count: 0
    }

    handleIncrement = () => {
        this.setState({count: this.state.count + 1});
    };



    render() {
        return (
            <>
                <Button             
                    variant="danger"
                    className="like-btn ml-3 mb-3"
                    style={{width: "50px"}}
                    onClick={this.handleIncrement}
                >
                    <i className="far fa-thumbs-up"></i>
                    <p className="mb-0 d-inline" style={{fontSize: "1rem"}}>{this.state.count}</p>    
                </Button>
            </>
        );
    }
}

export default DislikeButton;