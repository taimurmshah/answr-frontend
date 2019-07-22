import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions.js";
import { Menu } from "semantic-ui-react";

class GamePlayNavbar extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <Menu>
        <Menu.Item position="left">
          <img alt="" src="../../../mod-5-logo.png" />
        </Menu.Item>
        {this.props.friends.length > 0 ? (
          this.props.friends.length === 1 ? (
            <Menu.Item position="middle" className="friend-status">
              You are playing with {this.props.friends[0].name}, waiting for one
              more...
            </Menu.Item>
          ) : (
            <Menu.Item position="middle" className="friend-status">
              You are playing with {this.props.friends[0].name} and{" "}
              {this.props.friends[1].name}
            </Menu.Item>
          )
        ) : (
          <Menu.Item position="left" className="friend-status">
            Waiting for friends to join
          </Menu.Item>
        )}
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
        <Menu.Item
          onClick={() => {
            this.props.history.push("/home");
          }}
        >
          Home
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.game.friends
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
