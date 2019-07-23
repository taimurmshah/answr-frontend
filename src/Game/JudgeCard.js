import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Button} from "semantic-ui-react";


class JudgeCard extends Component {
    render() {
        return (
            <Card size="small">
                <Card.Content>
                    <Card.Header>{this.props.user.name}</Card.Header>
                    <Card.Description>{this.props.text}</Card.Description>
                    <Button size="small" color="green" basic onClick={() => {
                        console.log("I voted for this")
                    }}>Vote</Button>
                </Card.Content>
            </Card>
        );
    }
}

export default connect()(JudgeCard)