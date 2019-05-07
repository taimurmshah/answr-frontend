import React from "react";
import { connect } from "react-redux";
import { Button, Loader, Dimmer, Segment, Grid } from "semantic-ui-react";
import { toggleStartGame, toggleAnswerForm } from "../../redux/actions.js";
import { incrementGameRound } from "../../redux/thunks.js";
import { withRouter } from "react-router-dom";
class PromptContainer extends React.Component {
  checkSubmitButtonRender = () => {
    if (
      !this.props.startGame &&
      this.props.users.length === 2 &&
      this.props.currentUser.id === this.props.users[0].id
    ) {
      return <Button onClick={this.startHandler}>Start Game</Button>;
    }
  };

  showAnswers = () => {
    if (this.props.answers.length === 1) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader>Waiting</Loader>
          </Dimmer>
        </Segment>
      );
    } else if (this.props.answers.length === 2) {
      let myAnswer = this.props.answers.filter(
        answer => answer.user_id === this.props.currentUser.id
      )[0].answer;
      let friendAnswer = this.props.answers.filter(
        answer => answer.user_id !== this.props.currentUser.id
      )[0].answer;
      return (
        <div>
          <h3>You answered: {myAnswer}</h3>
          <h3>
            {this.props.friend.name} answered: {friendAnswer}
          </h3>
        </div>
      );
    }
  };

  startHandler = () => {
    console.log("This is working");
    fetch("http://localhost:3000/api/v1/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        game_id: this.props.gameId
      })
    });
  };

  exitHandler = () => {
    this.props.history.push("/home");
  };

  nextRoundButton = () => {
    if (
      this.props.currentRound < 3 &&
      this.props.answers.length === 2 &&
      this.props.currentUser.id === this.props.users[0].id
    ) {
      return <Button onClick={this.nextRoundHandler}>Next Round</Button>;
    } else if (
      this.props.currentRound === 3 &&
      this.props.answers.length === 2
    ) {
      return <Button onClick={this.exitHandler}>Exit Game</Button>;
    }
  };

  nextRoundHandler = () => {
    this.props.incrementGameRound(this.props.gameId);
  };

  render() {
    console.log("these are the props:", this.props);
    return (
      <div>
        <Grid centered verticalAlign="middle" columns={1}>
          <Grid.Column textAlign="center">
            {this.props.startGame ? (
              <h2>{this.props.rounds[this.props.index].prompt}</h2>
            ) : null}

            {this.showAnswers()}
            {this.checkSubmitButtonRender()}
          </Grid.Column>

          {this.nextRoundButton()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friend: state.friend,
    rounds: state.rounds,
    startGame: state.startGame,
    currentUser: state.currentUser,
    users: state.users,
    gameId: state.currentGame.id,
    currentRound: state.currentRound,
    index: state.currentRound - 1,
    answers: state.answers[state.currentRound]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleStartGame: () => dispatch(toggleStartGame()),
    toggleAnswerForm: () => dispatch(toggleAnswerForm()),
    incrementGameRound: gameId => dispatch(incrementGameRound(gameId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PromptContainer)
);
