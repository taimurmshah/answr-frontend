import React from "react";
import { Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { playerJoinsGame } from "../redux/thunks.js";
import { withRouter } from "react-router-dom";
import { openGame, clearAvailableGames } from "../redux/actions.js";

class GameCard extends React.Component {
  clickHandler = () => {
    console.log("join game clickHandler. here're the props:", this.props);
    //todo does this method cause the backend to broadcast an updated array? Where is that information received? probably in gameList?
    this.props.playerJoinsGame(
      this.props.id,
      this.props.currentUser.id,
      this.props.history
    );
    //i think this action is what takes a player into the game. openGame and startGame are different. it navigates the user to /play-game, todo via app.js Switch??
    this.props.openGame();
    this.props.clearAvailableGames();
  };
  render() {
    return (
      <Card size="mini">
        <Card.Content>
          <Card.Header>{this.props.title}</Card.Header>
          {/* todo I want to show how many players are in the game, and how many more are needed. how could I do this? pretty easily, i bet. */}
          <Button
            onClick={this.clickHandler}
            size="mini"
            floated="right"
            basic
            color="green"
          >
            Join this Game
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playerJoinsGame: (gameId, userId, historyObj) =>
      dispatch(playerJoinsGame(gameId, userId, historyObj)),
    openGame: () => dispatch(openGame()),
    clearAvailableGames: () => dispatch(clearAvailableGames())
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
  )(GameCard)
);
