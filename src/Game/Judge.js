import React, { Component } from "react";
import { connect } from "react-redux";
import JudgeCard from "./JudgeCard"
import {judgeAnswerForm} from "../redux/actions";

class Judge extends Component {

  componentDidMount() {
    if (this.props.answerForm === true && this.props.currentJudge === false) {
      console.log("hitting componentDidMount conditional for Judge")
      this.props.judgeAnswerForm();
    }
    console.log("these are the answers in the judge component:", this.props.answers)
  }

  render() {

    let cards;

    if (this.props.answers.length === 2) {
      cards = this.props.answers.map(answer => (<JudgeCard key={answer.id} user={this.props.users.filter(user => (user.id === answer.user_id))[0]} text={answer.answer} />))
    }

    return (
      <div>
        <h2>I AM THE JUDGE</h2>


        {this.props.answers.length === 2 ? (cards) : null}

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
    users: state.game.users

  }
};

const mapDispatchToProps = dispatch => {
  return {
    judgeAnswerForm: () => dispatch(judgeAnswerForm())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Judge);
