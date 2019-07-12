/* comments go ABOVE the code.*/
/* todo this component will be redone in src/Game/Prompt*/
import React from "react";
import Play from "./Play";

import { connect } from "react-redux";
import { Button, Loader, Dimmer, Segment, Grid } from "semantic-ui-react";
import {
  toggleStartGame,
  toggleAnswerForm,
  loadJudges,
  updateJudge,
  loadFirstRound
} from "../../redux/actions.js";
import { incrementGameRound } from "../../redux/thunks.js";
import { withRouter } from "react-router-dom";
class PromptContainer extends React.Component {
  //so that player one can start the game once the game is full (three users total).
  checkSubmitButtonRender = () => {
    if (
      !this.props.startGame &&
      this.props.users.length === 3 /*changed from 2; adding a third player*/ &&
      this.props.currentUser.id === this.props.users[0].id
    ) {
      return <Button onClick={this.startHandler}>Start Game</Button>;
    }
  };

  //checks to see if the players have answered their questions
  /* todo i'll probably have to redo this somehow including the judging. How am I going to incorporate the judging?
   *   i'll need to hit the back end, and improve the schemas for existing models/create new models. */
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

  //this is how player one starts the game; this hits a route that is broadcasting to all the other users in the game room.
  startHandler = () => {
    fetch("http://localhost:3000/api/v1/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        game_id: this.props.gameId
      })
    })
      .then(this.props.loadJudges())
      .then(this.props.updateJudge())
      .then(this.props.loadFirstRound());
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
    return (
      <div>
        <Grid centered verticalAlign="middle" columns={1}>
          <Grid.Column textAlign="center">
            {this.props.startGame && this.props.currentJudge ? (
              this.props.currentUser.id === this.props.currentJudge.id ? (
                <h2>You are the judge for this round</h2>
              ) : (
                <h2>You are not a judge; you are a participant</h2>
              )
            ) : (
              <Play />
            )}

            {/*{this.showAnswers()}*/}
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
    answers: state.answers[state.currentRound],
    currentJudge: state.currentJudge
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleStartGame: () => dispatch(toggleStartGame()),
    toggleAnswerForm: () => dispatch(toggleAnswerForm()),
    incrementGameRound: gameId => dispatch(incrementGameRound(gameId)),
    loadJudges: () => dispatch(loadJudges()),
    updateJudge: () => dispatch(updateJudge()),
    loadFirstRound: () => dispatch(loadFirstRound())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PromptContainer)
);
