import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { toggleNewGameModal } from "/Users/taimur/Bootcamp/Five/mod-5-front/src/redux/actions.js";

class NewGame extends React.Component {
  state = {
    title: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Modal open={true} size={"mini"}>
        <Modal.Content>
          <p>Create New Game:</p>
          <Input
            name="Title"
            value={this.state.title}
            placeholder="enter title"
            onChange={this.changeHandler}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button>Submit</Button>
          <Button onClick={this.props.toggleNewGameModal}>Go Back</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNewGameModal: () => dispatch(toggleNewGameModal())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewGame);
