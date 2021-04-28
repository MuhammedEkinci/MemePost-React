import React from "react";
import { Button} from "react-bootstrap";

class SaveButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCardSaved: false,
        }
    }

    render() {
        return (
            <Button 
                variant="btn btn-outline save-btn"
                onClick={() => this.setState({ isCardSaved: !this.state.isCardSaved })}>
                
                { this.state.isCardSaved

                    ? <i className="fas fa-bookmark"></i>
                    : <i className="far fa-bookmark"></i>
                }

            </Button>
        );
    }
}

export default SaveButton