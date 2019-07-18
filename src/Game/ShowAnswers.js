import React, { Component } from "react";
import { connect } from "react-redux";

class ShowAnswers extends Component {
  showAnswers = () => {
    if (this.props.answers.length === 1) {
      console.log("one answer:", this.props.answers);
      if (this.props.answers[0].user_id === this.props.myId) {
        return <h3>You answered: {this.props.answers[0].answer}</h3>;
      }
    } else if (this.props.answers.length === 2) {
      console.log("two answers:", this.props.answers);
      let myAnswer = this.props.answers.filter(
        answer => answer.user_id === this.props.myId
      );
      let friendAnswer = this.props.answers.filter(
        answer => answer.user_id !== this.props.myId
      );
      let friendName = this.props.friends.filter(
        friend => friend.id === friendAnswer[0].user_id
      );
      console.log("friendName:", friendName);
      friendName = friendName[0].name;

      return (
        <div>
          <h3>You answered: {myAnswer[0].answer}</h3>
          <h3>
            {friendName} answered: {friendAnswer[0].answer}
          </h3>
        </div>
      );
    }
  };

  render() {
    return <div>{this.showAnswers()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    answers: state.currentPromptAnswers,
    myId: state.currentUser.id,
    friends: state.friends
  };
};

export default connect(mapStateToProps)(ShowAnswers);
