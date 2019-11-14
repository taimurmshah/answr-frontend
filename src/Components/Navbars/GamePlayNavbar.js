import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions.js";
// import {Menu} from "semantic-ui-react";

class GamePlayNavbar extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <div className="navbar">
        <p className="logo">Answr</p>

        {this.props.currentJudge ? (
          <span className="menu-item">
            The current judge is: {this.props.currentJudge.name}
          </span>
        ) : null}

        {this.props.game ? (
          <span className="menu-item">Game: {this.props.game}</span>
        ) : null}

        {this.props.friends.length > 0 ? (
          this.props.friends.length === 1 ? (
            <span className="menu-item">
              You are playing with {this.props.friends[0].name}, waiting for one
              more...
            </span>
          ) : (
            <span className=" menu-item">
              You are playing with {this.props.friends[0].name} and{" "}
              {this.props.friends[1].name}
            </span>
          )
        ) : (
          <span className="menu-item">Waiting for friends to join</span>
        )}

        <span className="grow" />

        <button
          className="button menu-button"
          onClick={() => {
            this.props.history.push("/home");
          }}
        >
          Home
        </button>

        {this.isUserLoggedIn() ? (
          <button
            className="button menu-button"
            onClick={() => {
              localStorage.removeItem("token");
              this.props.logOut();
            }}
          >
            Log Out
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.game.friends,
    currentJudge: state.game.currentJudge,
    game: state.game.currentGame.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GamePlayNavbar)
);
