import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  logOut,
  toggleGame,
  toggleNewGameModal,
  toggleViewGames
} from "../../redux/actions.js";
// import { Menu, Image } from "semantic-ui-react";

/* view available Games, host new game */

class HomeNavbar extends React.Component {
  /* todo write this method somewhere else and export it.*/
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <div>
        {this.isUserLoggedIn() ? (
          <button
            position="right"
            onClick={() => {
              localStorage.removeItem("token");
              //if user is logged in, create a button to log them out.
              this.props.logOut();
            }}
          >
            Log Out
          </button>
        ) : null}
        {/*todo not sure what this method does; is it checking to see if someone is looking at the game list? or is it checking to see if there is a game in session.*/}
        {this.props.isGameOpen ? null : (
          <button
            onClick={() => {
              // todo why am i having users redirected to the game list, and not to home?

              this.props.history.push("/games");
            }}
          >
            View Available Games
          </button>
        )}
        {/*todo i think this is checking to see whether a user is in a game, or if the gamelist page is on. what redux action makes this boolean true? */}
        {this.props.isGameOpen ? null : (
          /*todo look @ newGameModal.*/
          <button onClick={this.props.toggleNewGameModal}>Host New Game</button>
        )}
      </div>
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
