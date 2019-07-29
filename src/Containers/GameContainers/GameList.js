import React from "react";
import { connect } from "react-redux";
import GameCard from "../../Components/GameCard.js";
import { Grid } from "semantic-ui-react";

class GameList extends React.Component {
  render() {
    let games = this.props.availableGames.map(game => {
      return <GameCard key={game.id} title={game.title} id={game.id} />;
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
    availableGames: state.pregame.availableGames
  };
};

export default connect(mapStateToProps)(GameList);
