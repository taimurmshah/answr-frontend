import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeSignupModal } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

const Signup = props => {
  return (
    <Modal open={true} size={"mini"}>
      <Modal.Content>
        <p>Sign Up:</p>
        <Input placeholder="name" />
        <Input placeholder="email" />
        <Input placeholder="password" />
      </Modal.Content>
      <Modal.Actions>
        <Button>Register</Button>
        <Button onClick={props.closeSignupModal}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    closeSignupModal: () => {
      dispatch(closeSignupModal());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
