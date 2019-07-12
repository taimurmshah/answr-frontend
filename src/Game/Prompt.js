/* todo what this component needs to do:
     - should this component also start the game? or should that be a separate component?
        - I should aim to follow SRP as much as I can; but should a button be it's own component?
        - it would definitely clean my code up a LOT.
*    - show the current prompt
*    - show users' answers;
*       - show a "waiting for <friend name> to answer
*       - show my opponent's answer one he's done
*    - unsure: should I show the points in this component?
*       - perhaps after a round is done.
*   should this be a functional component?
* */

import React, { Component } from "react";
import { connect } from "react-redux";
import StartButton from "./StartButton";

class Prompt extends Component {
  render() {
    return (
      <div>
        {!this.props.startGame &&
        this.props.users.length === 3 &&
        this.props.currentUser.id === this.props.users[0].id ? (
          <StartButton />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    startGame: state.startGame,
    users: state.users,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Prompt);
