import React, {Component} from "react";
import {connect} from "react-redux";
import JudgeCard from "./JudgeCard"
import {judgeAnswerForm} from "../redux/actions";

class Judge extends Component {

    componentDidMount() {
        console.log("component did mount of Judge component");
        if (this.props.answerForm === true && this.props.currentJudge === false) {
            this.props.judgeAnswerForm();
        }
    }

    render() {

        let cards;

        if (this.props.answers.length === 2) {
            cards = this.props.answers.map(answer => (
                <JudgeCard key={answer.user_id} user={this.props.users.filter(user => (user.id === answer.user_id))[0]}
                           text={answer.answer} />))
        }

        return (
            <div>

                {this.props.answers.length === 2 && this.props.voted === false ? (cards) : null}

            </div>
        );
    }
}


const mapStateToProps = state => {
    console.log("here's state:", state);
    console.log("state.game.rounds[state.game.currentRound][state.game.currentPrompt].id:", state.game.rounds[state.game.currentRound][state.game.currentPrompt].id);
    return {
        currentUser: state.auth.currentUser,
        currentJudge: state.game.currentJudge,
        answers: state.game.currentPromptAnswers,
        answerForm: state.game.answerForm,
        users: state.game.users,
        voted: state.game.voted

    }
};

const mapDispatchToProps = dispatch => {
    return {
        judgeAnswerForm: () => dispatch(judgeAnswerForm())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Judge);
