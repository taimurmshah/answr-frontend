import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeLoginModal } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

const Login = props => {
  return (
    <Modal open={true} size={"mini"}>
      <Modal.Content>
        <p>Log In:</p>
        <Input placeholder="email" />
        <br />
        <Input placeholder="password" />
      </Modal.Content>
      <Modal.Actions>
        <Button>Log in</Button>
        <Button onClick={props.closeLoginModal}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    closeLoginModal: () => {
      dispatch(closeLoginModal());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
