import React from "react";
import { connect } from "react-redux";
import { addWizard } from "../redux/actions.js";

class CreateForm extends React.Component {
  state = {
    title: "",
    url: ""
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("this is getting hit");
    this.props.addMeme(this.state);
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Create a new Meme!</h3>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="title"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="url"
            value={this.state.url}
            placeholder="url"
            onChange={this.changeHandler}
          />
          <button name="submit" value="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMeme: memeObj => {
      dispatch({ type: "ADD_MEME", payload: memeObj });
    }
  };
};

const connector = connect(
  null,
  mapDispatchToProps
);

const exporter = connector(CreateForm);
export default exporter;
