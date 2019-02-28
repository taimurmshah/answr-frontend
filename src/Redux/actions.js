export const addMeme = memeObj => {
  return {
    type: "ADD_MEME",
    payload: memeObj
  };
};

export const selectMeme = meme => {
  return {
    type: "SELECT_MEME",
    payload: meme
  };
};

export const loadMemes = memes => {
  return {
    type: "LOAD_MEMES",
    payload: memes
  };
};

export const postMeme = meme => {
  return {
    type: "POST_MEME",
    payload: meme
  };
};

export const newMemeClick = url => {
  return {
    type: "NEW_MEME_CLICK",
    payload: { bool: true, url: url }
  };
};

export const openLoginModal = () => {
  return {
    type: "OPEN_LOGIN_MODAL",
    payload: true
  };
};

export const openSignUpModal = () => {
  return {
    type: "OPEN_SIGNUP_MODAL",
    payload: true
  };
};
