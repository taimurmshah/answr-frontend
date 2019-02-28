import React, { Component } from "react";
import "./App.css";
import MainPage from "./Containers/MainPage";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return <Route path="/" component={MainPage} />;
  }
}

export default App;
