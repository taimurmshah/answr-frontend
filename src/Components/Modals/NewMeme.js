import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class NewMeme extends React.Component {
  // getDataURL = () => {
  //   let base_image = new Image();
  //   base_image.src = this.props.url;
  //   let canvas = document.createElement("canvas");
  //   canvas.height = base_image.naturalHeight;
  //   canvas.width = base_image.naturalWidth;
  //   let context = canvas.getContext("2d");
  //   context.drawImage(base_image, 0, 0);
  //   debugger;
  // };

  render() {
    console.log("NewMeme props:", this.props);
    return (
      <Modal open={true}>
        <Modal.Header>YO</Modal.Header>
        <img alt="" src={this.props.url} />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.newMemeUrl
  };
};

export default connect(mapStateToProps)(NewMeme);
