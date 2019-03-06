import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { toggleNewGameModal } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import { createNewGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import { withRouter } from "react-router-dom";

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
    this.props.createNewGame(this.state, this.props.currentUser);
    this.props.history.push("/play-game");
  };

  render() {
    return (
      <Modal open={true} size={"mini"}>
        <Modal.Content>
          <p>Create New Game:</p>
          <Input
            name="title"
            value={this.state.title}
            placeholder="enter title"
            onChange={this.changeHandler}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.createHandler}>Submit</Button>
          <Button onClick={this.props.toggleNewGameModal}>Go Back</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNewGameModal: () => dispatch(toggleNewGameModal()),
    createNewGame: (gameObj, userObj) =>
      dispatch(createNewGame(gameObj, userObj))
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewGame)
);
