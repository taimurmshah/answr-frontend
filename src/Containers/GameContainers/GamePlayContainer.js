import React from "react";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import PromptContainer from "./PromptContainer";

class GamePlayContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>GamePlayContainer</h1>
        <PromptContainer />
      </div>
    );
  }
}

const mapDispatchToProps = () => {};

export default connect(
  null,
  mapDispatchToProps
)(GamePlayContainer);
