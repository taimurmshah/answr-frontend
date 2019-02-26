//state and action are both objects
import memes from "../memes";

const initialState = {
  memes: memes
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MEME":
      let newMeme = action.payload;
      let newArray = [...state.memes, newMeme];
      return { ...state, memes: newArray };
    default:
      return state;
  }
};

export default reducer;
