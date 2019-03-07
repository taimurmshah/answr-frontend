import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import PromptContainer from "./PromptContainer";
import GamePlayNavbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/GamePlayNavbar.js";
import { deleteGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/thunks.js";
import {
  gameNoLongerOpen,
  addFriend,
  removeFriend,
  addUsers,
  removeUsers
} from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";
import AnswerForm from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Forms/AnswerForm.js";
class GamePlayContainer extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {
    //not working with a refresh.
    this.props.gameNoLongerOpen();
    this.props.deleteGame(this.props.currentGame);
    this.props.removeFriend();
    this.props.removeUsers();
  }

  handleReceivedMessage = message => {
    console.log("websocket in GamesPlayContainer:", message);
    if (message.game) {
      console.log("this is the users array:", message.game.users);
      this.props.addUsers(message.game.users);
      let friend = message.game.users.filter(
        user => user.id !== this.props.currentUser.id
      );
      friend = friend[0];
      console.log("this is my friend:", friend);
      this.props.addFriend(friend);
    }
  };

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
        <h3>{}</h3>
        <h1>GamePlayContainer</h1>
        <h3>{this.props.currentGame.title}</h3>
        <PromptContainer />
        <AnswerForm />
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
    removeUsers: () => dispatch(removeUsers())
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
