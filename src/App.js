/*----------------------------I am implementing DFS in my comment-ifying!-----------------------------*/

import React, { Component } from "react";
/*todo why is this different than index.css?*/
import "./App.css";

//once a user is logged in.
import Home from "./Containers/Home";

//container component for list of gameCards.
import GameListContainer from "./Containers/GameContainers/GameListContainer.js";

//container for the flow of the game play.
import GamePlayContainer from "./Containers/GameContainers/GamePlayContainer.js";

//navigation among different components; worth reading documentation/practicing more.
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

/*todo wtf does this component do? is landing where they login/reg?*/
import Landing from "./Containers/Landing";
import { connect } from "react-redux";

//to check if the user is already logged in && to check from backend if there are any active & available games.
/*todo I want to remove from available games the games that are in session/have three users in them.*/
import { logUserInWithToken, getGames } from "./redux/thunks.js";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      //checking to see if the user is already logged in.
      /*todo what responsibility do I have to log the user out?*/
      let token = localStorage.getItem("token");
      /*todo how does this method work?*/
      this.props.logUserInWithToken(token);
    } else {
      /*todo should I be doing anything else in this code block?*/
      console.log("no token");
    }
  }

  /*todo shouldn't I use this method in the componentDidMount up top? I should test this individually.*/
  isUserLoggedIn = () => {
    return localStorage.getItem("token");
  };

  render() {
    return (
      <div id="top-div">
        <Switch>
          {/*general rule, most specific/complex path (word-wise) up top. todo arrow function b/c there's logic in there? I should know why. */}
          <Route
            path="/play-game"
            render={() => {
              return (
                <div>
                  {this.isUserLoggedIn() &&
                  Object.keys(this.props.currentGame).length > 0 ? (
                    /*todo I want the game to be in play if the user accidentally refreshes. How can I accomplish this? could i potentially implement auth for a specific game? how would I do that?*/
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
                  {/*just checking if the user is logged in. todo what logic does GameListContainer contain? could I possibly control what games are showed here, thus only showing games that need players?*/
                  this.isUserLoggedIn() ? (
                    <GameListContainer />
                  ) : (
                    /*good to keep in mind; this is how Browser-Router redirects users.*/
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
                    /*landing must be the login/reg page.*/
                    <Landing />
                  )}
                </div>
              );
            }}
          />
        </Switch>
        {/* todo why did i put the image in like this?*/}
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
