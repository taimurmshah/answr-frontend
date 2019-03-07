import React from "react";
import { Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { playerTwoJoinsGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";

class GameCard extends React.Component {
  clickHandler = () => {
    console.log("join game clickHandler. here're the props:", this.props);
    this.props.playerTwoJoinsGame(this.props.id, this.props.currentUser.id);
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
    playerTwoJoinsGame: (gameId, userId) =>
      dispatch(playerTwoJoinsGame(gameId, userId))
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCard);
