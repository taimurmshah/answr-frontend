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

export const closeLoginModal = () => {
  return {
    type: "CLOSE_LOGIN_MODAL",
    payload: false
  };
};

export const openSignupModal = () => {
  return {
    type: "OPEN_SIGNUP_MODAL",
    payload: true
  };
};

export const closeSignupModal = () => {
  return {
    type: "CLOSE_SIGNUP_MODAL",
    payload: false
  };
};

export const regUser = res => {
  console.log("this is the res:", res);
  return {
    type: "REG_USER",
    payload: res.user
  };
};

export const logUser = res => {
  console.log("this is the res:", res);
  return {
    type: "LOG_USER_IN",
    payload: res.user
  };
};

export const jwtLog = res => {
  return {
    type: "JWT_LOG",
    payload: res.user
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
    payload: {}
  };
};

export const toggleGame = () => {
  return {
    type: "TOGGLE_GAME"
  };
};

export const toggleNewGameModal = () => {
  return {
    type: "TOGGLE_NEW_GAME_MODAL"
  };
};

export const newCurrentGame = res => {
  return {
    type: "NEW_CURRENT_GAME",
    payload: res
  };
};
