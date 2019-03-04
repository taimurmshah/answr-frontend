import React, { Component } from "react";
import "./App.css";
import Home from "./Containers/Home";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Landing from "./Containers/Landing";
import { connect } from "react-redux";
import { logUserInWithToken } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

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
    console.log("Yes");
    console.log(Object.keys(this.props.currentUser).length > 0);
    return Object.keys(this.props.currentUser).length > 0;
  };

  conditionalRender = () => {
    if (this.isUserLoggedIn()) {
      return <Home />;
    } else {
      return <Redirect to="/" />;
    }
  };
  render() {
    console.log("App props:", this.props);
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={Landing} />
          {/*<Route
            path="/home"
            render={() => {
              return (
                <div>
                  {this.isUserLoggedIn() ? <Home /> : <Redirect to="/" />}
                </div>
              );
            }}
          />*/}
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

const mapDispatchToProps = dispatch => {
  return {
    logUserInWithToken: token => dispatch(logUserInWithToken(token))
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
