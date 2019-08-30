import React, { Component } from "react";
import { connect } from "react-redux";
import { exitGame } from "../redux/actions";
// import {Card, Grid, Button} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Results extends Component {
  clickHandler = () => {
    this.props.exitGame();
    this.props.history.push("/home");
  };

  render() {
    let cards;
    if (this.props.scoreBoard) {
      cards = this.props.scoreBoardArray.map(user => (
        <div>
          <p>{user}</p>
          <h3>Score: {this.props.scoreBoard[user]}</h3>
        </div>
      ));
    }
    return (
      <div>
        <h1>RESULTS</h1>

        {this.props.scoreBoard ? cards : null}

        <button onClick={this.clickHandler}>Exit</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scoreBoard: state.game.scoreBoard,
    scoreBoardArray: Object.keys(state.game.scoreBoard),
    users: state.game.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    exitGame: () => dispatch(exitGame())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);
