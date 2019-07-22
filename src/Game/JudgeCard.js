import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Button} from "semantic-ui-react";



class JudgeCard extends Component {
    render() {
        console.log("this.props:", this.props);
        return (
            <Card size="small">
                <Card.Content>
                    <Card.Header>{this.props.user.name}</Card.Header>
                    <Card.Description>{this.props.text}</Card.Description>
            </Card.Content>
            </Card>
        );
    }
}

export default connect()(JudgeCard)