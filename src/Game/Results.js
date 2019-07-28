import React, {Component} from "react";
import {connect} from "react-redux"
import {Card} from "semantic-ui-react";

class Results extends Component {


    render() {

        let cards;
        if (this.props.scoreBoard) {
            cards = this.props.scoreBoardArray.map(user => (
                <Card>
                    <Card.Content>
                        <Card.Header>{user}</Card.Header>
                        <Card.Description>Score: {this.props.scoreBoard[user]}</Card.Description>
                    </Card.Content>
                </Card>
            ));

        }
        return (
            <div>
                <h1>RESULTS</h1>
                {this.props.scoreBoard ? cards : <h2>Loading</h2>}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        scoreBoard: state.game.scoreBoard,
        scoreBoardArray: Object.keys(state.game.scoreBoard),
        users: state.game.users
    }
};


export default connect(mapStateToProps)(Results)