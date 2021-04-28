import React from "react";
import TrollFace from "../pictures/Trollface.png";
import Pepe from "../pictures/Pepe.png";

const imageSrc = {
  minus: TrollFace,
  plus: Pepe
}

class Logo extends React.Component{

  state= {
    open: true
  }

  toggleImage = () => {
    this.setState(state => ({open: !state.open}))
  }

  getImageSrc = () => this.state.open ? 'plus' : 'minus'

  render() {
    const imageName = this.getImageSrc();
    return (
      <image className="d-inline-block" alt="meme-post-logo" style={{maxWidth: "50px"}} src={imageSrc[imageName]} onClick={() => this.toggleImage} />
    );
  }
}

export default Logo;