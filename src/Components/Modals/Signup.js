import React from "react";
import { Modal, Input } from "semantic-ui-react";

export const Signup = props => {
  return (
    <Modal open={true} size={"mini"}>
      <Modal.Content>
        <p>Sign Up:</p>
        <Input placeholder="name" />
        <Input placeholder="email" />
        <Input placeholder="password" />
      </Modal.Content>
    </Modal>
  );
};
