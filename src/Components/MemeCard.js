import React from "react";
import { connect } from "react-redux";
import { selectMeme } from "../redux/actions";

class MemeCard extends React.Component {
  clickHandler = () => {
    this.props.selectMeme(this.props.meme);
  };

  render() {
    const { meme } = this.props;
    return (
      <div>
        <h1>{meme.title}</h1>
        <img
          id={meme.title}
          className="thumbnail"
          alt=""
          src={meme.url}
          onClick={this.clickHandler}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { selectMeme: meme => dispatch(selectMeme(meme)) };
};

export default connect(
  null,
  mapDispatchToProps
)(MemeCard);
