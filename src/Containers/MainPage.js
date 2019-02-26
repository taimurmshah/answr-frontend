import React from "react";
import CreateForm from "../Components/CreateForm";
import MemeList from "./MemeList";
import SelectedMeme from "../Components/SelectedMeme";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to MemeList!</h1>
        <SelectedMeme />
        <CreateForm />
        <MemeList />
      </div>
    );
  }
}

export default MainPage;
