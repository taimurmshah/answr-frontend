import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import GameList from "./GameList";
import {
  handleReceivedGame,
  removeAvailableGame
} from "../../redux/actions.js";
import { getGames } from "../../redux/thunks.js";
import GameListNavbar from "../../Components/Navbars/GameListNavbar.js";

class GameListContainer extends React.Component {
  componentDidMount() {
    this.props.getGames();
  }

  socketHandler = gameObj => {
    /* todo what is the object that is being sent here? can I possibly control rendering of the gameCard from the backend?
     *  as in, if the game is full, could I remove it from the gameList from here? */
    gameObj.game
      ? this.props.handleReceivedGame(gameObj.game)
      : this.removeHandler(gameObj.id);
  };

  removeHandler = id => {
    /* todo this doesn't seem to be working; the game still shows up under "view available games" when a fourth user looks at that list. */
    let gameId = parseInt(id);
    this.props.removeAvailableGame(gameId);
  };

  render() {
    return (
      <div>
        {/*  all this does is present options to log out, or go back home. */}
        <GameListNavbar />
        {/* todo This is receiving newly created games, and I also think it is receiving games that are full;
            it might be receiving just the full array of game objects. if so, how can I only display
            games that are waiting for players? Is there any creative use of a stack or queue here?
            I can just sort them by how many players there are... */}
        <ActionCableConsumer
          channel={{ channel: "GameChannel" }}
          onReceived={data => {
            this.socketHandler(data);
          }}
        />
        {/*renders cards of all the available games (or, it's supposed to be only available games...)*/}
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
