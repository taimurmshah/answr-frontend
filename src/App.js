import React, { Component } from "react";
import "./App.css";
import MainPage from "./Containers/MainPage";
import NewMeme from "./Components/Modals/NewMeme";
import Home from "./Containers/Home";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Landing from "./Containers/Landing";
import { connect } from "react-redux";

class App extends Component {
  isUserLoggedIn = () => {
    console.log(Object.keys(this.props.currentUser).length > 0);
    return Object.keys(this.props.currentUser).length > 0;
  };

  render() {
    console.log("App props:", this.props);
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default withRouter(connect(mapStateToProps)(App));

/* () => {
  return (
    <div>
      {this.isUserLoggedIn() ? <Home /> : <Redirect to="/" />}
    </div>
  );
} */
