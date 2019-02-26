import React from "react";
import CreateForm from "../Components/CreateForm";
import MemeList from "./MemeList";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to MemeList!</h1>
        <CreateForm />
        <MemeList />
      </div>
    );
  }
}

export default MainPage;
