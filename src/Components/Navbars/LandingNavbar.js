import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  openLoginModal,
  openSignupModal
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import Login from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/Login.js";
import Signup from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/Signup.js";

const LandingNavbar = props => {
  return (
    <ul>
      <li onClick={props.openLoginModal}>login</li>
      {props.loginOpen ? <Login /> : null}
      <li onClick={props.openSignupModal}>sign up</li>
      {props.signupOpen ? <Signup /> : null}
      <Link to="/mainpage">
        <li>home</li>
      </Link>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginModal: () => dispatch(openLoginModal()),
    openSignupModal: () => dispatch(openSignupModal())
  };
};

const mapStateToProps = state => {
  return {
    loginOpen: state.loginModalOpen,
    signupOpen: state.signupModalOpen
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingNavbar);
