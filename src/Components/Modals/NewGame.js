import React from "react";
// import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { toggleNewGameModal, openGame } from "../../redux/actions.js";
import { createNewGame } from "../../redux/thunks.js";
import { withRouter } from "react-router-dom";

/*todo can i add an event listener that will allow the submit to work on 'enter'?
 *  how would i go about implementing this? */

class NewGame extends React.Component {
  state = {
    title: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createHandler = () => {
    this.props.createNewGame(
      this.state,
      this.props.currentUser,
      this.props.history
    );
    this.props.openGame();
    this.props.toggleNewGameModal();
  };

  render() {
    return (
      <div className="landing-modal">
        <div className="modal-form">
          <p>Create New Game:</p>
          <input
            name="title"
            value={this.state.title}
            placeholder="enter title"
            onChange={this.changeHandler}
          />
          <button className="submit-button button" onClick={this.createHandler}>
            Submit
          </button>
          <button
            className="close-button button"
            onClick={this.props.toggleNewGameModal}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNewGameModal: () => dispatch(toggleNewGameModal()),
    createNewGame: (gameObj, userObj, historyObj) =>
      dispatch(createNewGame(gameObj, userObj, historyObj)),
    openGame: () => dispatch(openGame())
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewGame)
);
