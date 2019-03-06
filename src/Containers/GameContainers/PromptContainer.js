import React from "react";
import { connect } from "react-redux";

class PromptContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>PromptContainer</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {};

export default connect(mapStateToProps)(PromptContainer);
