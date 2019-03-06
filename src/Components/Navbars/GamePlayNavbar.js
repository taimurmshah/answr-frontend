import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

class GamePlayNavbar extends React.Component {
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
          <li
            onClick={() => {
              this.props.history.push("/home");
            }}
          >
            Home
          </li>
        </ul>
      </div>
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
  )(GamePlayNavbar)
);
