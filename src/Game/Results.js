import React, {Component} from "react";
import {connect} from "react-redux"
import {exitGame} from "../redux/actions";
import {Card, Grid, Button} from "semantic-ui-react";
import {withRouter} from "react-router-dom";

class Results extends Component {


    clickHandler = () => {
        this.props.exitGame();
        this.props.history.push("/home")
    };

    render() {

        let cards;
        if (this.props.scoreBoard) {
            cards = this.props.scoreBoardArray.map(user => (
                <Grid.Column>
                    <Card centered>
                        <Card.Content>
                            <Card.Header>{user}</Card.Header>
                            <Card.Description>Score: {this.props.scoreBoard[user]}</Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            ));

        }
        return (
            <div>
                <h1>RESULTS</h1>
                <Grid container textAlign='center' columns={1}>
                    <Grid.Row centered columns={3}>
                        {this.props.scoreBoard ? cards : null}
                    </Grid.Row>
                </Grid>
                <Button onClick={this.clickHandler}>Exit</Button>
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

const mapDispatchToProps = dispatch => {
    return {
        exitGame: () => dispatch(exitGame())
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results))