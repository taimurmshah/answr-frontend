import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
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
    <Menu>
      <Menu.Item position="left">
        <img alt="" src="../../../mod-5-logo.png" />
      </Menu.Item>
      <Menu.Item position="right" onClick={props.openLoginModal}>
        login
      </Menu.Item>
      {props.loginOpen ? <Login /> : null}
      <Menu.Item onClick={props.openSignupModal}>sign up</Menu.Item>
      {props.signupOpen ? <Signup /> : null}
    </Menu>
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
    loginOpen: state.loginModalOpen,
    signupOpen: state.signupModalOpen,
    isGameOpen: state.isGameOpen
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingNavbar)
);
