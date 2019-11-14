import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions.js";
// import {Menu, Icon} from "semantic-ui-react";

class GameListNavbar extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <div className="navbar">
        <button
          className="menu-button button"
          onClick={() => {
            this.props.history.push("/home");
          }}
        >
          Home
        </button>

        {this.isUserLoggedIn() ? (
          <button
            className="menu-button button"
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

const mapStateToProps = state => ({});

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
