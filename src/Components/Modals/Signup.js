import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeSignupModal } from "../../redux/actions.js";
import { registerUser } from "../../redux/thunks.js";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.registerUser(this.state);
    this.setState({
      name: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <Modal open={true} size={"mini"}>
        <Modal.Content>
          <p>Sign Up:</p>
          <Input
            name="name"
            value={this.state.name}
            placeholder="name"
            onChange={this.changeHandler}
          />
          <Input
            name="email"
            value={this.state.email}
            placeholder="email"
            onChange={this.changeHandler}
          />
          <Input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.changeHandler}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.submitHandler}>Register</Button>
          <Button onClick={this.props.closeSignupModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSignupModal: () => {
      dispatch(closeSignupModal());
    },
    registerUser: userObj => {
      dispatch(registerUser(userObj));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
