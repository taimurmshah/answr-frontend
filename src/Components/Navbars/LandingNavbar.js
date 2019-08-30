import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { Menu } from "semantic-ui-react";
import {
  openLoginModal,
  openSignupModal,
  logOut,
  toggleGame,
  toggleNewGameModal
} from "../../redux/actions.js";
import Login from "../Modals/Login.js";
import Signup from "../Modals/Signup.js";
// import { getGames } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

const LandingNavbar = props => {
  return (
    <>
      {/*<Menu.Item position="left">*/}
      {/*  <img alt="" src="../../../mod-5-logo.png" />*/}
      {/*</Menu.Item>*/}
      <button className="login-button button" onClick={props.openLoginModal}>
        Login
      </button>
      {props.loginOpen ? <Login /> : null}

      <button className="signup-button button" onClick={props.openSignupModal}>
        Sign Up
      </button>
      {props.signupOpen ? <Signup /> : null}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginModal: () => dispatch(openLoginModal()),
    openSignupModal: () => dispatch(openSignupModal()),
    logOut: () => {
      dispatch(logOut());
    },
    toggleGame: () => dispatch(toggleGame()),
    toggleNewGameModal: () => dispatch(toggleNewGameModal())
  };
};

const mapStateToProps = state => {
  return {
    loginOpen: state.auth.loginModalOpen,
    signupOpen: state.auth.signupModalOpen,
    isGameOpen: state.pregame.isGameOpen
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingNavbar)
);
