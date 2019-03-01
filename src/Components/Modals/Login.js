import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeLoginModal } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import { logUserIn } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

class Login extends React.Component {
  state = {
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
    this.props.logUserIn(this.state);
    this.setState(
      {
        email: "",
        password: ""
      },
      () => {
        console.log("updated state:", this.state);
      }
    );
  };

  render() {
    return (
      <Modal open={true} size={"mini"}>
        <Modal.Content>
          <p>Log In:</p>
          <Input
            name="email"
            value={this.state.name}
            placeholder="email"
            onChange={this.changeHandler}
          />
          <br />
          <Input
            name="password"
            value={this.state.name}
            placeholder="password"
            onChange={this.changeHandler}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.submitHandler}>Log in</Button>
          <Button onClick={this.props.closeLoginModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeLoginModal: () => {
      dispatch(closeLoginModal());
    },
    logUserIn: userObj => {
      dispatch(logUserIn(userObj));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
