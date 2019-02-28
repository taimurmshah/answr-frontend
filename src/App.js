import React, { Component } from "react";
import "./App.css";
import MainPage from "./Containers/MainPage";
import NewMeme from "./Components/Modals/NewMeme";
import { Route, Switch } from "react-router-dom";
import Landing from "./Containers/Landing";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/mainpage" component={MainPage} />
          <Route path="/newmeme" component={NewMeme} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}

export default App;
