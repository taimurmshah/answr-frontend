import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { logUserInWithToken } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import Navbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/Navbar.js";

class Home extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  componentDidMount() {
    console.log("token:", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      this.props.logUserInWithToken(token);
    } else {
      console.log("no token");
    }
  }

  render() {
    console.log("homepage props:", this.props.currentUser);
    console.log("is the user logged in?", this.isUserLoggedIn());
    return (
      <div>
        <Navbar />
        {this.isUserLoggedIn() ? (
          <h1>{`Welcome, ${this.props.currentUser.name}`}</h1>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logUserInWithToken: token => dispatch(logUserInWithToken(token))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
