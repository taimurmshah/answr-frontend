import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import PromptContainer from "./PromptContainer";
import GamePlayNavbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/GamePlayNavbar.js";
import { deleteGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import { gameNoLongerOpen } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

class GamePlayContainer extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {
    //not working with a refresh.
    this.props.gameNoLongerOpen();
    this.props.deleteGame(this.props.currentGame);
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.currentGame).length > 0 ? (
          <ActionCableConsumer
            channel={{
              channel: "RoundsChannel",
              game_id: this.props.currentGame.id
            }}
            onReceived={message => {
              console.log("websocket in GamesPlayContainer:", message);
            }}
          />
        ) : (
          console.log("currentUser not yet loaded")
        )}

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
    deleteGame: gameObj => dispatch(deleteGame(gameObj)),
    gameNoLongerOpen: () => dispatch(gameNoLongerOpen())
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
