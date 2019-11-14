import React from "react";
// import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeLoginModal } from "../../redux/actions.js";
import { logUserIn } from "../../redux/thunks.js";
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
      <div className="landing-modal">
        <div className="modal-form">
          <p>Log In:</p>
          <input
            name="email"
            value={this.state.name}
            placeholder="email"
            onChange={this.changeHandler}
          />
          <input
            type="password"
            name="password"
            value={this.state.name}
            placeholder="password"
            onChange={this.changeHandler}
          />
          <button className="submit-button button" onClick={this.submitHandler}>
            Log in
          </button>
          <button
            className="close-button button"
            onClick={this.props.closeLoginModal}
          >
            Close
          </button>
        </div>
      </div>
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
