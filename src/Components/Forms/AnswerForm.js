import React from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { submitAnswer } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import { toggleAnswerForm } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
class AnswerForm extends React.Component {
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
      this.props.userId
    );
    this.props.toggleAnswerForm();
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        {this.props.startGame && this.props.answerForm ? (
          <>
            <h3>Enter your answer here</h3>
            <Form onSubmit={this.submitHandler}>
              <Form.Field>
                <label>Answer</label>
                <input
                  required
                  type="text"
                  name="text"
                  value={this.state.text}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startGame: state.startGame,
    gameId: state.currentGame.id,
    userId: state.currentUser.id,
    answerForm: state.answerForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAnswer: (answerText, gameId, userId) =>
      dispatch(submitAnswer(answerText, gameId, userId)),
    toggleAnswerForm: () => dispatch(toggleAnswerForm())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerForm);
