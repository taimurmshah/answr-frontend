import React from "react";
import { connect } from "react-redux";
import { newMemeClick } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

class UrlForm extends React.Component {
  state = {
    url: ""
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.newMemeClick(this.state.url);
  };

  render() {
    console.log(
      "urlFormProps, looking for the dispatched function:",
      this.props
    );
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="url"
            value={this.state.url}
            placeholder="enter url"
            onChange={this.changeHandler}
          />
          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { newMemeClick: url => dispatch(newMemeClick(url)) };
};

export default connect(
  null,
  mapDispatchToProps
)(UrlForm);
