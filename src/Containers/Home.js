import React from "react";
import { connect } from "react-redux";

/* todo brush up on withRouter; what does it do?
 *   i think it allows the component to use history.push and other methods.*/
import { withRouter, Redirect } from "react-router-dom";
import { logUserInWithToken } from "../redux/thunks.js";

//controls what logged in users will see on the home navbar & the respective logic.
import HomeNavbar from "../Components/Navbars/HomeNavbar";

//how a user creates a new game! i believe the navbar will control whether this modal is open.
import NewGame from "../Components/Modals/NewGame";

class Home extends React.Component {
  isUserLoggedIn = () => {
    /* todo why is this different than the same method on app.js? probably because I will need to use some of the information from the user object.
     *   could I potentially import this method from somewhere else? I've used it so far in two separate components.*/
    return localStorage.getItem("token") && this.props.currentUser;
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      console.log("component: Home, in componentDidMount method");
      this.props.logUserInWithToken(token);
    } else {
      console.log("no token");
    }
  }

  render() {
    return (
      <div>
        <HomeNavbar />
        {this.isUserLoggedIn() ? (
          this.props.currentUser.name ? (
            <h1 className="title">{`Welcome, ${
              this.props.currentUser.name
            }`}</h1>
          ) : (
            <h1 className="title">Welcome</h1>
          )
        ) : (
          <Redirect to="/" />
        )}
        {this.props.newGameModal ? <NewGame /> : null}
        <p>
          Answr is a game you can play with your friends. You can either host a
          new game, or view if there are any available games. Each game consists
          of three players, and each player will be a judge for one round. Lets
          get started!
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    newGameModal: state.pregame.newGameModal
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
