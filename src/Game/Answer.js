import React, { Component } from "react";
import { connect } from "react-redux";
import { submitAnswer } from "../redux/thunks";
import { toggleAnswerForm } from "../redux/actions.js";
import { Form, Button } from "semantic-ui-react";

class Answer extends Component {
  state = {
    text: ""
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.submitAnswer(
      this.state.text,
      this.props.gameId,
      this.props.userId,
      this.props.roundId
    );
    this.props.toggleAnswerForm();
    this.setState({ text: "" });
  };

  render() {
    return (
      <div className="answer-form">
        {this.props.answerForm ? (
          <div>
            <Form onSubmit={this.submitHandler}>
              <Form.Field>
                <input
                  required
                  type="text"
                  name="text"
                  placeholder="Enter Your Answer Here"
                  value={this.state.text}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameId: state.game.currentGame.id,
    userId: state.auth.currentUser.id,
    answerForm: state.game.answerForm,
    roundId:
      state.game.rounds[state.game.currentRound][state.game.currentRound].id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAnswer: (answerText, gameId, userId, roundId) =>
      dispatch(submitAnswer(answerText, gameId, userId, roundId)),
    toggleAnswerForm: () => dispatch(toggleAnswerForm())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
