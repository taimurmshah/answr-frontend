import React, { Component } from "react";
import { connect } from "react-redux";

class Prompt extends Component {
  render() {
    let currentPrompt = this.props.rounds[this.props.currentRound][
      this.props.currentPrompt
    ].prompt;
    return (
      <>
        <h2>{currentPrompt}</h2>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    rounds: state.rounds,
    currentRound: state.currentRound,
    currentPrompt: state.currentPrompt
  };
};

export default connect(mapStateToProps)(Prompt);
