import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  logOut,
  toggleGame,
  toggleNewGameModal,
  toggleViewGames
} from "../../redux/actions.js";
import { Menu, Image } from "semantic-ui-react";

/* view available Games, host new game */

class HomeNavbar extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <Menu>
        <Menu.Item position="left">
          <img alt="" src="../../../mod-5-logo.png" />
        </Menu.Item>
        {this.isUserLoggedIn() ? (
          <Menu.Item
            position="right"
            onClick={() => {
              localStorage.removeItem("token");
              this.props.logOut();
            }}
          >
            Log Out
          </Menu.Item>
        ) : null}
        {this.props.isGameOpen ? null : (
          <Menu.Item
            onClick={() => {
              this.props.history.push("/games");
            }}
          >
            View Available Games
          </Menu.Item>
        )}
        {this.props.isGameOpen ? null : (
          <Menu.Item onClick={this.props.toggleNewGameModal}>
            Host New Game
          </Menu.Item>
        )}
      </Menu>
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
