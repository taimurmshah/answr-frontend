import React from "react";
import MemeCard from "../Components/MemeCard";
import { connect } from "react-redux";
import { getMemes } from "../redux/thunks";
import NewMeme from "../Modals/NewMemeModal";

class MemeList extends React.Component {
  state = {
    renderModal: false
  };

  componentDidMount() {
    this.props.getMemes();
  }

  clickHandler = () => {};

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

const mapDispatchToProps = dispatch => {
  return { getMemes: () => dispatch(getMemes()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemeList);
