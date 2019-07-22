import React, { Component } from "react";
import { connect } from "react-redux";

class Play extends Component {
  render() {
    return (
      <div>
        {this.props.startGame && this.props.currentQuestion ? (
          <p>{this.props.currentQuestion.prompt}</p>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rounds: state.game.rounds,
    currentRound: state.game.currentRound,
    currentQuestion: state.game.currentQuestion,
    startGame: state.pregame.startGame
  };
};

export default connect(mapStateToProps)(Play);
