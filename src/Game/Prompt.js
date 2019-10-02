import React, { Component } from "react";
import { connect } from "react-redux";

class Prompt extends Component {
  render() {
    let currentPrompt = this.props.rounds[this.props.currentRound][
      this.props.currentPrompt
    ].prompt;

    return <h2 className="prompt">{currentPrompt}</h2>;
  }
}

const mapStateToProps = state => {
  return {
    rounds: state.game.rounds,
    currentRound: state.game.currentRound,
    currentPrompt: state.game.currentPrompt,
    answers: state.game.answers,
    currentUser: state.auth.currentUser,
    friends: state.game.friends
  };
};

export default connect(mapStateToProps)(Prompt);
