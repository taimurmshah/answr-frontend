import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class NewMeme extends React.Component {
  render() {
    console.log("NewMeme props:", this.props);
    return (
      <Modal open={true}>
        <Modal.Header>YO</Modal.Header>
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
