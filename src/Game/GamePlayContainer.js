/* todo what this component needs to do:
     - should this component also start the game? or should that be a separate component?
        - I should aim to follow SRP as much as I can; but should a button be it's own component?
        - it would definitely clean my code up a LOT.
*    - show the current prompt
*    - show users' answers;
*       - show a "waiting for <friend name> to answer
*       - show my opponent's answer one he's done
*    - unsure: should I show the points in this component?
*       - perhaps after a round is done.
*   should this be a functional component?
* */

import React, { Component } from "react";
import Answer from "./Answer";
import Judge from "./Judge";
import Prompt from "./Prompt";
import ShowAnswers from "./ShowAnswers";
import Results from "./Results";

import { connect } from "react-redux";
import StartButton from "./StartButton";

class GamePlayContainer extends Component {
  render() {
    return (
      <div>
        {this.props.final ? <Results /> : null}

        {!this.props.startGame &&
        this.props.users.length === 3 &&
        this.props.currentUser.id === this.props.users[0].id &&
        this.props.final === false ? (
          <StartButton />
        ) : null}

        {this.props.startGame && this.props.final === false ? <Prompt /> : null}

        {this.props.startGame &&
        this.props.currentJudge &&
        this.props.final === false ? (
          this.props.currentJudge.id !== this.props.currentUser.id ? (
            <Answer />
          ) : null
        ) : null}

        {this.props.startGame &&
        this.props.currentJudge &&
        this.props.final === false ? (
          this.props.currentJudge.id === this.props.currentUser.id ? (
            <Judge />
          ) : null
        ) : null}

        {this.props.answerForm === false && this.props.final === false ? (
          <ShowAnswers />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startGame: state.pregame.startGame,
    users: state.game.users,
    currentUser: state.auth.currentUser,
    currentJudge: state.game.currentJudge,
    answerForm: state.game.answerForm,
    final: state.game.final
  };
};

export default connect(mapStateToProps)(GamePlayContainer);
