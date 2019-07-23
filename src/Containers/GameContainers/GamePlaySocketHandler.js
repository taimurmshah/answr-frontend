/* todo i could probably make the flow of the game a lot easier by breaking down the gamePlay components into smaller and more SRP (single responsibility principle) components. How?
 *   - the purpose of this component could be SOLELY to handle websocket messages, and then pass down/dispatch shit.
 *   - if a user leaves the game, I want the game to end. So, I could send an alert to players in the game once the user has left, something like "[name] has left the game. The game has ended."
 *   - It really would be better to track the game flow on the backend, that way, if a user refreshes, and their redux shit is reset, fetching the game info will bring them back in the game.
 *   - Instead of having shit on the componentWillUnmount, could i have it on the navbar? so when the user presses "Home" or "logout," he will patch the game on the backend, destroying the game, and
 *     the other players will receive a message, via socket, that the game has ended, and that they should navigate home. Why did I use componentWillUnmount
 *   - could i separate the websocket component from another component? or should I import the method from another file?
 *      - maybe have a file called "actionCable-methods.js"? Yeah, for now, I'll try that.
 *        - it won't work, because those methods need to be connected to the redux store, which means those methods need to be in a react component.
 * */

import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import GamePlayNavbar from "../../Components/Navbars/GamePlayNavbar.js";
import GamePlayContainer from "../../Game/GamePlayContainer";
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
  pregameExit,
  gameExit
} from "../../redux/actions.js";
import { Grid } from "semantic-ui-react";

class GamePlaySocketHandler extends React.Component {
  //todo the fuck is this for? could I use it? do I need to?
  componentDidMount() {}

  //not working with a refresh.
  /* todo to work with a refresh, I could potentially do an auth check again.
      could i make auth for the game itself? game auth? how would I do that?
   *   I'd need to study how I implemented the JWT for regular auth. Are there
       any other ways? I could use the game id in the route, and check to see if the user
   *   belongs to the game.users array.   */
  componentWillUnmount() {
    //toggles store "gameOpen" from true to false, then app.js router navigates back to ./home.
    this.props.gameNoLongerOpen();

    //this is a thunk. todo I want to broadcast the message to all users when this happens,
    //                  so that they get an alert that the game is done, and they can choose to redirect.
    this.props.deleteGame(this.props.currentGame);

    //turns "friends" array in reducer to an empty array.
    this.props.removeFriend();
    //same thing
    this.props.removeUsers();

    //this does a fuckton of shit, but really, it's just returning state to
    //what it was before the game started.
    //this.props.exitGame();
    this.props.pregameExit();
    this.props.gameExit();
  }

  handleReceivedMessage = message => {
    /* todo this is a cluster fuck of a method. could it even be broken down? */
    //this is if someone joins the game. todo i should call this message.join
    if (message.game) {
      //adds users, and broadcasts to other games.
      console.log("socket handler, here's the message:", message)
      this.props.addUsers(message.game.users);

      let friends = message.game.users.filter(
        user => user.id !== this.props.currentUser.id
      );

      this.props.addFriend(friends);
    } else if (message.start) {
      //changes redux state key "startGame" to true, which in turn
      //controls what is rendered.
      console.log("link start-u");
      this.props.toggleStartGame();


      this.props.toggleAnswerForm();
      /* todo I need to rework how the rounds work, both on the front and in the back. how? */

      //determines order of judges
      this.props.loadJudges();

      //sets the judge based on what the current round is.
      this.props.updateJudge();


    } else if (message.answer) {
      /* todo i will most likely have to change how the answering system works too. */
      this.props.addAnswers(message);
    } else if (message.increment) {
      /* todo again, i'll most likely need to change this shit too. The big problem
       *   with the app right now is that the game isn't playable. I want to tackle
       *   this problem by having many single responsibility components, completely
       *   rewriting how it works. */
      this.props.incrementRound();

      this.props.toggleAnswerForm();
    }
  };

  /*in the future, write this in a switch, or an actioncable reducer*/
  render() {
    return (
      <div>
        {/*if there is a current game, open up the connection. otherwise, don't. todo should i make the other condition a redirect? */}
        {Object.keys(this.props.currentGame).length > 0 ? (
          <ActionCableConsumer
            channel={{
              channel: "RoundsChannel",
              game_id: this.props.currentGame.id
            }}
            onReceived={this.handleReceivedMessage}
          />
        ) : null}

        {/*this navbar will just show the players in the game, as well as the options
            to hit home or logout. in both cases,
            todo I should end the game for other players and have that alert that the game has ended. */}
        <GamePlayNavbar />

        {/* todo how the fuck does this work? I gotta read the docs for this shit. i'm probably using it shittily*/}
        <Grid centered verticalAlign="middle" columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h1 className="title">
                "{this.props.currentGame.title}" is in session
              </h1>

              {/* todo I think i'll have to create new components for the gameplay.
                    how should they work? They should be as SRP as possible. */}

              <GamePlayContainer />

              {/* todo the answer form looks like ass, I need to fix it up. */}
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
    pregameExit: () => dispatch(pregameExit()),
    gameExit: () => dispatch(gameExit()),
    loadJudges: () => dispatch(loadJudges()),
    updateJudge: () => dispatch(updateJudge())
  };
};

const mapStateToProps = state => {
  return {
    currentGame: state.game.currentGame,
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlaySocketHandler);
