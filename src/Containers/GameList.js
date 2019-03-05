import React from "react";
import { connect } from "react-redux";

class GameList extends React.Component {
  render() {
    let games = this.props.availableGames.map(game => {
      return <li key={game.id}>{game.title}</li>;
    });
    return (
      <div>
        <ul>{games}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    availableGames: state.availableGames
  };
};

export default connect(mapStateToProps)(GameList);
