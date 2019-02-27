//state and action are both objects
//import memes from "../memes";

const initialState = {
  memes: [],
  selectedMeme: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_MEMES":
      let memes = action.payload;
      let memeArray = [...memes, ...state.memes];
      return { ...state, memes: memeArray };
    case "POST_MEME":
      let newMeme = action.payload;
      let newArray = [newMeme, ...state.memes];
      return { ...state, memes: newArray };
    case "SELECT_MEME":
      return { ...state, selectedMeme: action.payload };
    default:
      return state;
  }
};

export default reducer;
