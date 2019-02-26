import React from "react";

class MemeCard extends React.Component {
  render() {
    const { meme } = this.props;

    return (
      <div>
        <h1>{meme.title}</h1>
        <img alt="" src={meme.url} />
      </div>
    );
  }
}

export default MemeCard;
