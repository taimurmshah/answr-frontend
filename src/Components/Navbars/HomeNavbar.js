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
  /* todo write this method somewhere else and export it.*/
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
              //if user is logged in, create a button to log them out.
              this.props.logOut();
            }}
          >
            Log Out
          </Menu.Item>
        ) : null}
        {/*todo not sure what this method does; is it checking to see if someone is looking at the game list? or is it checking to see if there is a game in session.*/}
        {this.props.isGameOpen ? null : (
          <Menu.Item
            onClick={() => {
              // todo why am i having users redirected to the game list, and not to home?
              this.props.history.push("/games");
            }}
          >
            View Available Games
          </Menu.Item>
        )}
        {/*todo i think this is checking to see whether a user is in a game, or if the gamelist page is on. what redux action makes this boolean true? */}
        {this.props.isGameOpen ? null : (
          /*todo look @ newGameModal.*/
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
    isGameOpen: state.pregame.isGameOpen
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
