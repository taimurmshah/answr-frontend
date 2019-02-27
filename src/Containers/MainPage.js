import React from "react";
//import CreateForm from "../Components/Forms/CreateForm";
import MemeList from "./MemeList";
import SelectedMeme from "../Components/SelectedMeme";
import NewMeme from "../Components/Modals/NewMeme";
import UrlForm from "../Components/Forms/urlForm";
import { connect } from "react-redux";

class MainPage extends React.Component {
  render() {
    console.log("MainPage props:", this.props);

    return (
      <div>
        <h1>Welcome to MemeList!</h1>
        <SelectedMeme />
        <div>
          <h2>Create a new meme</h2>
          <UrlForm />
          {this.props.isModalOpen ? <NewMeme /> : null}
        </div>
        <MemeList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.isModalOpen
  };
};

export default connect(mapStateToProps)(MainPage);
