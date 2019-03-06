import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  logOut,
  toggleGame,
  toggleNewGameModal,
  toggleViewGames
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

/* view available Games, host new game */

class HomeNavbar extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <div>
        <ul>
          {this.isUserLoggedIn() ? (
            <li
              onClick={() => {
                localStorage.removeItem("token");
                this.props.logOut();
              }}
            >
              Log Out
            </li>
          ) : null}
          {this.props.isGameOpen ? null : (
            <li
              onClick={() => {
                this.props.history.push("/games");
              }}
            >
              View Available Games
            </li>
          )}
          {this.props.isGameOpen ? null : (
            <li onClick={this.props.toggleNewGameModal}>Create New Game</li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGameOpen: state.isGameOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    toggleGame: () => dispatch(toggleGame()),
    toggleNewGameModal: () => dispatch(toggleNewGameModal()),
    toggleViewGames: () => dispatch(toggleViewGames())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeNavbar)
);
