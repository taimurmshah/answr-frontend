import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import GameList from "./GameList";
import {
  handleReceivedGame,
  removeAvailableGame
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import { getGames } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import GameListNavbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/GameListNavbar.js";

class GameListContainer extends React.Component {
  componentDidMount() {
    this.props.getGames();
  }

  socketHandler = gameObj => {
    gameObj.game
      ? this.props.handleReceivedGame(gameObj.game)
      : this.removeHandler(gameObj.id);
  };

  removeHandler = id => {
    let gameId = parseInt(id);
    this.props.removeAvailableGame(gameId);
  };

  render() {
    return (
      <div>
        <GameListNavbar />
        <ActionCableConsumer
          channel={{ channel: "GameChannel" }}
          onReceived={data => {
            console.log("websocket in GamesListContainer:", data);
            this.socketHandler(data);
          }}
        />
        <GameList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleReceivedGame: gameObj => dispatch(handleReceivedGame(gameObj)),
    removeAvailableGame: gameId => dispatch(removeAvailableGame(gameId)),
    getGames: () => dispatch(getGames())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GameListContainer);
