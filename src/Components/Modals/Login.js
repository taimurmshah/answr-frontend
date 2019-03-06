import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeLoginModal } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import { logUserIn } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import { withRouter } from "react-router-dom";

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
    this.props.logUserIn(this.state);
    this.props.history.push("/home");
    this.setState({
      email: "",
      password: ""
    });
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
            type="password"
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

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
