import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  openLoginModal,
  openSignupModal,
  logOut,
  toggleGame,
  toggleNewGameModal
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import Login from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/Login.js";
import Signup from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/Signup.js";
// import { getGames } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

const LandingNavbar = props => {
  return (
    <div>
      <ul>
        <li onClick={props.openLoginModal}>login</li>
        {props.loginOpen ? <Login /> : null}
        <li onClick={props.openSignupModal}>sign up</li>
        {props.signupOpen ? <Signup /> : null}
      </ul>
    </div>
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

/*

<li
  onClick={() => {
    props.toggleGame();
    props.history.push("/game");
  }}
>
  {props.isGameOpen ? "exit game" : "play game"}
</li>

*/
