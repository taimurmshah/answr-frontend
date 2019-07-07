import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import PromptContainer from "./PromptContainer";
import GamePlayNavbar from "../../Components/Navbars/GamePlayNavbar.js";
import { deleteGame } from "../../redux/thunks.js";
import {
  gameNoLongerOpen,
  addFriend,
  removeFriend,
  addUsers,
  removeUsers,
  toggleStartGame,
  addAnswers,
  incrementRound,
  toggleAnswerForm,
  exitGame,
  loadJudges,
  updateJudge,
  loadFirstRound
} from "../../redux/actions.js";
import AnswerForm from "../../Components/Forms/AnswerForm.js";
import { Grid } from "semantic-ui-react";

class GamePlayContainer extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {
    //not working with a refresh.
    this.props.gameNoLongerOpen();
    this.props.deleteGame(this.props.currentGame);
    this.props.removeFriend();
    this.props.removeUsers();
    this.props.exitGame();
  }

  handleReceivedMessage = message => {
    if (message.game) {
      this.props.addUsers(message.game.users);
      let friends = message.game.users.filter(
        user => user.id !== this.props.currentUser.id
      );

      this.props.addFriend(friends);
    } else if (message.start) {
      this.props.toggleStartGame();
      console.log("one");
      this.props.loadFirstRound();
      console.log("two");
      this.props.loadJudges();
      this.props.updateJudge();
    } else if (message.answer) {
      this.props.addAnswers(message);
    } else if (message.increment) {
      this.props.incrementRound();
      this.props.toggleAnswerForm();
    }
  };
  /*in the future, write this in a switch, or an actioncable reducer*/
  render() {
    return (
      <div>
        {Object.keys(this.props.currentGame).length > 0 ? (
          <ActionCableConsumer
            channel={{
              channel: "RoundsChannel",
              game_id: this.props.currentGame.id
            }}
            onReceived={this.handleReceivedMessage}
          />
        ) : (
          console.log("currentUser not yet loaded")
        )}

        <GamePlayNavbar />
        <Grid centered verticalAlign="middle" columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h1 className="title">
                "{this.props.currentGame.title}" is in session
              </h1>
              <PromptContainer />

              <AnswerForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteGame: gameObj => dispatch(deleteGame(gameObj)),
    gameNoLongerOpen: () => dispatch(gameNoLongerOpen()),
    addFriend: friend => dispatch(addFriend(friend)),
    removeFriend: () => dispatch(removeFriend()),
    addUsers: users => dispatch(addUsers(users)),
    removeUsers: () => dispatch(removeUsers()),
    toggleStartGame: () => dispatch(toggleStartGame()),
    addAnswers: answerObj => dispatch(addAnswers(answerObj)),
    incrementRound: () => dispatch(incrementRound()),
    toggleAnswerForm: () => dispatch(toggleAnswerForm()),
    exitGame: () => dispatch(exitGame()),
    loadJudges: () => dispatch(loadJudges()),
    updateJudge: () => dispatch(updateJudge()),
    loadFirstRound: () => dispatch(loadFirstRound())
  };
};

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayContainer);
