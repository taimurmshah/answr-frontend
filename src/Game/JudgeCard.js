import React, { Component } from "react";
import { connect } from "react-redux";
// import {Card, Button} from "semantic-ui-react";
import { toggleVoted } from "../redux/actions";

class JudgeCard extends Component {
  voteHandler = () => {
    this.props.toggleVoted();
    return fetch(`http://localhost:3000/api/v1/rounds/${this.props.roundId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        roundId: this.props.roundId,
        userId: this.props.user.id,
        gameId: this.props.gameId
      })
    });
  };

  render() {
    return (
      <div>
        <h3>{this.props.user.name}</h3>
        <p>{this.props.text}</p>
        <button size="small" color="green" basic onClick={this.voteHandler}>
          Vote
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    roundId:
      state.game.rounds[state.game.currentRound][state.game.currentPrompt].id,
    gameId: state.game.currentGame.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleVoted: () => dispatch(toggleVoted())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JudgeCard);
