import React, { Component } from "react";
import { connect } from "react-redux";

class Prompt extends Component {
  render() {
    const { currentRound, answers, currentUser, friends } = this.props;
    let currentPrompt = this.props.rounds[this.props.currentRound][
      this.props.currentPrompt
    ].prompt;

    return (
      <div>
        <h2>{currentPrompt}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rounds: state.rounds,
    currentRound: state.currentRound,
    currentPrompt: state.currentPrompt,
    answers: state.answers,
    currentUser: state.currentUser,
    friends: state.friends
  };
};

export default connect(mapStateToProps)(Prompt);
