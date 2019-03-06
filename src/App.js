import React, { Component } from "react";
import "./App.css";
import Home from "./Containers/Home";
import GameListContainer from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Containers/GameContainers/GameListContainer.js";
import GamePlayContainer from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Containers/GameContainers/GamePlayContainer.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Landing from "./Containers/Landing";
import { connect } from "react-redux";
import {
  logUserInWithToken,
  getGames
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

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
    console.log("App props:", this.props);
    return (
      <div>
        <Switch>
          <Route
            path="/play-game"
            render={() => {
              return (
                <div>
                  {this.isUserLoggedIn() ? (
                    <GamePlayContainer />
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
                  {this.isUserLoggedIn() ? (
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    isGameOpen: state.isGameOpen
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

/* () => {
  return (
    <div>
      {this.isUserLoggedIn() ? <Home /> : <Redirect to="/" />}
    </div>
  );
} */
