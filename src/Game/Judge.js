import React, { Component } from "react";
import { connect } from "react-redux";
import JudgeCard from "./JudgeCard";
import { judgeAnswerForm, toggleVoted, newBeginning } from "../redux/actions";
// import {Button, Grid} from "semantic-ui-react";

class Judge extends Component {
  state = {
    showButton: false
  };

  componentDidMount() {
    console.log(
      "judge CDM, this.props.answerForm?",
      this.props.answerForm,
      "this.props.isJudge?",
      this.props.isJudge,
      "this.state.showButton?",
      this.state.showButton
    );

    if (this.props.answerForm === true && this.props.isJudge === false) {
      this.props.judgeAnswerForm();
    }
  }

  timer = () => {
    console.log("this.timer has been triggered... why?");
    clearTimeout(myVar);
    let myVar = setTimeout(() => {
      this.setState({ showButton: true });
    }, 2000);
  };

  clickHandler = e => {
    e.preventDefault();
    this.props.toggleVoted();
    this.setState({ showButton: false });
    this.props.newBeginning();
    if (this.props.currentPrompt !== 2) {
      this.increment("prompt", this.props.gameId);
    } else {
      this.props.currentRound === 3
        ? this.increment("end", this.props.gameId)
        : this.increment("round", this.props.gameId);
    }
  };

  increment = (type, gameId) => {
    fetch("http://localhost:3000/api/v1/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: type,
        gameId
      })
    });
  };

  render() {
    let cards;

    if (this.props.answers.length === 2) {
      cards = this.props.answers.map(answer => (
        <div className="judge-card">
          <JudgeCard
            key={answer.user_id}
            user={
              this.props.users.filter(user => user.id === answer.user_id)[0]
            }
            text={answer.answer}
          />
        </div>
      ));
    }

    return (
      <div>
        <div>
          <div className="judge-card-container">
            {this.props.answers.length === 2 && this.props.voted === false
              ? cards
              : null}
          </div>
        </div>
        {this.props.voted && !this.state.showButton
          ? console.log(
              "timer is about to be hit",
              "this.props.voted?",
              this.props.voted
            )
          : null}
        {this.props.voted && !this.state.showButton ? this.timer() : null}

        {this.state.showButton ? (
          <div className="next-button-container">
            <button className="button next-button" onClick={this.clickHandler}>
              Next Prompt
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    currentJudge: state.game.currentJudge,
    answers: state.game.currentPromptAnswers,
    answerForm: state.game.answerForm,
    users: state.game.users,
    voted: state.game.voted,
    currentRound: state.game.currentRound,
    currentPrompt: state.game.currentPrompt,
    isJudge: state.game.isJudge,
    gameId: state.game.currentGame.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    judgeAnswerForm: () => dispatch(judgeAnswerForm()),
    toggleVoted: () => dispatch(toggleVoted()),
    newBeginning: () => dispatch(newBeginning())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Judge);
