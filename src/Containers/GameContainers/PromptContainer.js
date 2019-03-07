import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { toggleStartGame } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

class PromptContainer extends React.Component {
  checkButtonRender = () => {
    if (
      !this.props.startGame &&
      this.props.users.length === 2 &&
      this.props.currentUser.id === this.props.users[0].id
    ) {
      return <Button onClick={this.startHandler}>Start Game</Button>;
    }
  };

  startHandler = () => {
    console.log("This is working");
    this.props.toggleStartGame();
  };

  render() {
    console.log("these are the users:", this.props.users);
    return (
      <div>
        <h1>PromptContainer</h1>
        {this.checkButtonRender()}
        <h4>
          {this.props.friend.name
            ? `You are playing with ${this.props.friend.name}`
            : "Waiting for a friend"}
        </h4>
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
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleStartGame: () => dispatch(toggleStartGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromptContainer);
