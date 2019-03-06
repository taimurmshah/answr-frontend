import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import GameList from "./GameList";
import { handleReceivedGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import GameListNavbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/GameListNavbar.js";

class GameListContainer extends React.Component {
  socketHandler = gameObj => {
    this.props.handleReceivedGame(gameObj);
  };

  render() {
    console.log("I am in the GameListContainer");
    return (
      <div>
        <GameListNavbar />
        <ActionCableConsumer
          channel={{ channel: "GameChannel" }}
          onReceived={data => {
            console.log("websocket:", data);
            console.log("gameObj:", data.game);
            this.socketHandler(data.game);
          }}
        />
        <GameList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleReceivedGame: gameObj => dispatch(handleReceivedGame(gameObj))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GameListContainer);
