import React from "react";
import { connect } from "react-redux";
import GameCard from "../../Components/GameCard.js";
// import { Grid } from "semantic-ui-react";

class GameList extends React.Component {
  render() {
    let games = this.props.availableGames.map(game => {
      let host = game.users.find(user => user.id === game.player_one_id);

      return (
        <GameCard
          key={game.id}
          title={game.title}
          id={game.id}
          host={host.name}
          spots={3 - game.users.length}
        />
      );
    });
    return <div className="gamelist">{games}</div>;
  }
}

const mapStateToProps = state => {
  return {
    availableGames: state.pregame.availableGames
  };
};

export default connect(mapStateToProps)(GameList);
