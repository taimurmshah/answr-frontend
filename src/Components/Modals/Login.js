import React from "react";
import { Modal, Input } from "semantic-ui-react";

export const Login = props => {
  return (
    <Modal open={true} size={"mini"}>
      <Modal.Content>
        <p>Log In:</p>
        <Input placeholder="email" />
        <br />
        <Input placeholder="password" />
      </Modal.Content>
    </Modal>
  );
};
