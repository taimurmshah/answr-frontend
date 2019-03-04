import React from "react";
import Navbar from "/Users/taimur/Bootcamp/Five/mod-5-front/src/Components/Navbars/Navbar.js";
import { connect } from "react-redux";

class Game extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Game Page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGameOpen: state.isGameOpen
  };
};

export default connect(mapStateToProps)(Game);
