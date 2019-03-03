import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  isUserLoggedIn = () => {
    return Object.keys(this.props.currentUser).length > 0;
  };
  render() {
    console.log("homepage props:", this.props.currentUser);
    return (
      <div>
        {this.isUserLoggedIn() ? (
          <h1>{`Welcome, ${this.props.currentUser.name}`}</h1>
        ) : (
          <h1>Please Log in</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Home);
