import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { logUserInWithToken } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import HomeNavbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/HomeNavbar.js";
import NewGame from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Modals/NewGame.js";
class Home extends React.Component {
  isUserLoggedIn = () => {
    return localStorage.getItem("token") && this.props.currentUser;
  };

  componentDidMount() {
    // console.log("token:", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      this.props.logUserInWithToken(token);
    } else {
      console.log("no token");
    }
  }

  render() {
    // console.log("homepage props:", this.props.currentUser);
    // console.log("is the user logged in?", this.isUserLoggedIn());
    return (
      <div>
        <HomeNavbar />
        {this.isUserLoggedIn() ? (
          <h1 className="title">{`Welcome, ${this.props.currentUser.name}`}</h1>
        ) : (
          <Redirect to="/" />
        )}
        {this.props.newGameModal ? <NewGame /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    newGameModal: state.newGameModal
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
