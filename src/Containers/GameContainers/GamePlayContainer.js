import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import PromptContainer from "./PromptContainer";
import GamePlayNavbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/GamePlayNavbar.js";
import { deleteGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

class GamePlayContainer extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {
    this.props.deleteGame(this.props.currentGame);
  }

  render() {
    return (
      <div>
        <GamePlayNavbar />
        <h1>GamePlayContainer</h1>
        <h3>{this.props.currentGame.title}</h3>
        <PromptContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteGame: gameObj => dispatch(deleteGame(gameObj))
  };
};

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayContainer);
