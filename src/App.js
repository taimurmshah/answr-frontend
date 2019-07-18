import React, { Component } from "react";
import "./App.css";
import Home from "./Containers/Home";
import GameListContainer from "./Containers/GameContainers/GameListContainer.js";
import GamePlaySocketHandler from "./Containers/GameContainers/GamePlaySocketHandler.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Landing from "./Containers/Landing";
import { connect } from "react-redux";
import { logUserInWithToken, getGames } from "./redux/thunks.js";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      this.props.logUserInWithToken(token);
    } else {
      console.log("no token");
    }
  }

  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <div id="top-div">
        <Switch>
          <Route
            path="/play-game"
            render={() => {
              return (
                <div>
                  {this.isUserLoggedIn() &&
                  Object.keys(this.props.currentGame).length > 0 ? (
                    <GamePlaySocketHandler />
                  ) : (
                    <Redirect to="/" />
                  )}
                </div>
              );
            }}
          />
          <Route
            path="/games"
            render={() => {
              return (
                <div>
                  this.isUserLoggedIn() ? (
                  <GameListContainer />
                  ) : (
                  <Redirect to="/" />
                  )}
                </div>
              );
            }}
          />
          <Route path="/home" component={Home} />
          <Route
            path="/"
            render={() => {
              return (
                <div>
                  {this.isUserLoggedIn() ? (
                    <Redirect to="/home" />
                  ) : (
                    <Landing />
                  )}
                </div>
              );
            }}
          />
        </Switch>
        <img alt="" className="background-img" src="../mod-5-logo.png" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    isGameOpen: state.isGameOpen,
    currentGame: state.currentGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logUserInWithToken: token => dispatch(logUserInWithToken(token)),
    getGames: () => dispatch(getGames())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
