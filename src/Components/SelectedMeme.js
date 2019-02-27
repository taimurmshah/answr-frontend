import React from "react";
import { connect } from "react-redux";

class SelectedMeme extends React.Component {
  render() {
    return (
      <div>
        <h1>Selected Meme:</h1>
        {this.props.selectedMeme.title ? (
          <div>
            <h3>{this.props.selectedMeme.title}</h3>
            <img
              alt=""
              src={this.props.selectedMeme.url}
              height="300"
              width="300"
            />
          </div>
        ) : (
          <h4>Go ahead, select a meme</h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedMeme: state.selectedMeme };
};

export default connect(mapStateToProps)(SelectedMeme);
