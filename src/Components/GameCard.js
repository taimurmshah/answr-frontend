import React from "react";
import { Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { playerTwoJoinsGame } from "../redux/thunks.js";
import { withRouter } from "react-router-dom";
import { openGame } from "../redux/actions.js";

class GameCard extends React.Component {
  clickHandler = () => {
    console.log("join game clickHandler. here're the props:", this.props);
    this.props.playerTwoJoinsGame(
      this.props.id,
      this.props.currentUser.id,
      this.props.history
    );
    this.props.openGame();
  };
  render() {
    console.log("game card props:", this.props);

    return (
      <Card size="mini">
        <Card.Content>
          <Card.Header>{this.props.title}</Card.Header>
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
    playerTwoJoinsGame: (gameId, userId, historyObj) =>
      dispatch(playerTwoJoinsGame(gameId, userId, historyObj)),
    openGame: () => dispatch(openGame())
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
