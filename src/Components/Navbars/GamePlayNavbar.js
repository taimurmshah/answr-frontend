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
      <div>
        <button position="left">
          <img alt="" src="../../../mod-5-logo.png" />
        </button>

        {this.props.game ? (
          <button position="left">{this.props.game}</button>
        ) : null}

        {this.props.currentJudge ? (
          <button>The current judge is: {this.props.currentJudge.name}</button>
        ) : null}

        {this.props.friends.length > 0 ? (
          this.props.friends.length === 1 ? (
            <button className="friend-status">
              You are playing with {this.props.friends[0].name}, waiting for one
              more...
            </button>
          ) : (
            <button className="friend-status">
              You are playing with {this.props.friends[0].name} and{" "}
              {this.props.friends[1].name}
            </button>
          )
        ) : (
          <button position="left" className="friend-status">
            Waiting for friends to join
          </button>
        )}
        {this.isUserLoggedIn() ? (
          <button
            position="right"
            onClick={() => {
              localStorage.removeItem("token");
              this.props.logOut();
            }}
          >
            Log Out
          </button>
        ) : null}
        <button
          onClick={() => {
            this.props.history.push("/home");
          }}
        >
          Home
        </button>
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
