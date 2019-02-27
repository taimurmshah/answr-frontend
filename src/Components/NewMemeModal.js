import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class NewMemeModal extends React.Component {
  render() {
    return (
      <Modal>
        <Modal.Header>This is working</Modal.Header>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedMeme: state.selectedMeme
  };
};

export default connect(mapStateToProps)(NewMemeModal);
