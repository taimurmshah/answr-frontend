import React, {Component} from "react";
import {connect} from "react-redux";
import JudgeCard from "./JudgeCard"
import {judgeAnswerForm, toggleVoted} from "../redux/actions";
import {Button} from "semantic-ui-react";

class Judge extends Component {

    state = {
        showButton: false
    };

    componentDidMount() {
        if (this.props.answerForm === true && this.props.isJudge === false) {
            console.log("component didMount, this should be setting the state of isjudge to true, and answerform to false. ");
            this.props.judgeAnswerForm();
        }
    }

    timer = () => {
        clearTimeout(myVar);
        let myVar = setTimeout(() => {
            this.setState({showButton: true}
            )
        }, 2000);

    };

    clickHandler = (e) => {
        e.preventDefault();
        this.props.toggleVoted();
        this.setState({showButton: false});
        console.log("currentRound:", this.props.currentRound, "currentPrompt:", this.props.currentPrompt);
        if (this.props.currentPrompt !== 2) {
            console.log("simply increment the round number")
            //todo increment the round number here, with a fetch, as well as an action
            //  the action should set currentPromptAnswers to nil, both for myself as well as for the other players (via actionCable)
            //  it should also do the relevant shit to answerForm, etc.
        } else {
            this.props.currentRound === 3 ? console.log("end game") : console.log("increment round")
        }
    };

    render() {

        let cards;

        if (this.props.answers.length === 2) {
            cards = this.props.answers.map(answer => (
                <JudgeCard key={answer.user_id} user={this.props.users.filter(user => (user.id === answer.user_id))[0]}
                           text={answer.answer}/>))
        }

        return (
            <div>
                {this.props.answers.length === 2 && this.props.voted === false ? (cards) : null}

                {this.props.voted && !this.state.showButton ? this.timer() : null}

                {this.state.showButton ? <Button onClick={this.clickHandler}>Next Prompt</Button> : null}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        currentJudge: state.game.currentJudge,
        answers: state.game.currentPromptAnswers,
        answerForm: state.game.answerForm,
        users: state.game.users,
        voted: state.game.voted,
        currentRound: state.game.currentRound,
        currentPrompt: state.game.currentPrompt,
        isJudge: state.game.isJudge
    }
};

const mapDispatchToProps = dispatch => {
    return {
        judgeAnswerForm: () => dispatch(judgeAnswerForm()),
        toggleVoted: () => dispatch(toggleVoted())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Judge);
