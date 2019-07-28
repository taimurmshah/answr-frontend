import React, { Component } from "react";
import { connect } from "react-redux";

class ShowAnswers extends Component {

  componentDidMount() {
  }

  showAnswers = () => {
    if (this.props.answers.length === 1) {

      if (this.props.answers[0].user_id === this.props.myId) {
        return <h3>You answered: {this.props.answers[0].answer}</h3>;
      }
    } else if (this.props.answers.length === 2) {

      if (
        this.props.myId === this.props.answers[0].user_id ||
        this.props.myId === this.props.answers[1].user_id
      ) {
        let myAnswer = this.props.answers.filter(
          answer => answer.user_id === this.props.myId
        );
        let friendAnswer = this.props.answers.filter(
          answer => answer.user_id !== this.props.myId
        );
        let friendName = this.props.friends.filter(
          friend => friend.id === friendAnswer[0].user_id
        );

        friendName = friendName[0].name;
        myAnswer = myAnswer[0];
        friendAnswer = friendAnswer[0];

        return (
          <div>
            {this.props.voted && this.props.currentWinner ? <h2>The winner of this prompt is: {this.props.currentWinner}</h2> : null}
            <h3>You answered: {myAnswer.answer}</h3>
            <h3>
              {friendName} answered: {friendAnswer.answer}
            </h3>
          </div>
        );
      }
    }
  };

  render() {
    return <div>{this.showAnswers()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    answers: state.game.currentPromptAnswers,
    myId: state.auth.currentUser.id,
    friends: state.game.friends,
    voted: state.game.voted,
    currentWinner: state.game.currentWinner
  };
};

export default connect(mapStateToProps)(ShowAnswers);
