import React from "react";
import MemeCard from "../Components/MemeCard";
import { connect } from "react-redux";

class MemeList extends React.Component {
  render() {
    const { memes } = this.props;
    let memeProps = memes.map(meme => {
      return <MemeCard key={meme.id} meme={meme} />;
    });
    return (
      <div>
        <h1>This is the MemeList Component</h1>
        {memeProps}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    memes: state.memes
  };
};

export default connect(mapStateToProps)(MemeList);
