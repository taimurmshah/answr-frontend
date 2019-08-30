import React from "react";
// import { Modal, Input, Button } from "semantic-ui-react";
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
      <div className="landing-modal">
        <div className="modal-form">
          <p>Sign Up:</p>
          <input
            name="name"
            value={this.state.name}
            placeholder="name"
            onChange={this.changeHandler}
          />
          <input
            name="email"
            value={this.state.email}
            placeholder="email"
            onChange={this.changeHandler}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.changeHandler}
          />
          <button className="submit-button button" onClick={this.submitHandler}>
            Register
          </button>
          <button
            className="close-button button"
            onClick={this.props.closeSignupModal}
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
