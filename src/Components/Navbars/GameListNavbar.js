import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions.js";
import { Menu, Icon } from "semantic-ui-react";

class GameListNavbar extends React.Component {
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

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GameListNavbar)
);
