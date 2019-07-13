import React, { Component } from "react";
import { connect } from "react-redux";

class Judge extends Component {
  render() {
    return (
      <div>
        <h2>I AM THE JUDGE</h2>
      </div>
    );
  }
}

export default connect()(Judge);
