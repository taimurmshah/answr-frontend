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
  return {
    type: "REG_USER",
    payload: res.user
  };
};

export const logUser = res => {
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

export const addGames = res => {
  return {
    type: "ADD_GAMES",
    payload: res
  };
};

export const handleReceivedGame = gameObj => {
  return {
    type: "HANDLE_RECEIVED_GAME",
    payload: gameObj
  };
};

export const toggleViewGames = () => {
  return {
    type: "TOGGLE_VIEW_GAMES"
  };
};

export const putRounds = roundsArray => {
  return {
    type: "PUT_ROUNDS",
    payload: roundsArray
  };
};

export const removeCurrentGame = () => {
  return {
    type: "REMOVE_CURRENT_GAME"
  };
};

export const removeAvailableGame = gameId => {
  return {
    type: "REMOVE_AVAILABLE_GAME",
    payload: gameId
  };
};

export const playerTwoAddsCurrentGame = gameObj => {
  return {
    type: "PLAYER_TWO_ADDS_CURRENT_GAME",
    payload: gameObj
  };
};

export const gameNoLongerOpen = () => {
  return {
    type: "GAME_NO_LONGER_OPEN"
  };
};

export const openGame = () => {
  return {
    type: "OPEN_GAME"
  };
};

export const addFriend = friend => {
  return {
    type: "ADD_FRIEND",
    payload: friend
  };
};

export const removeFriend = () => {
  return {
    type: "REMOVE_FRIEND"
  };
};

export const setCurrentRound = round => {
  return {
    type: "SET_CURRENT_ROUND",
    payload: round
  };
};

export const toggleStartGame = () => {
  return {
    type: "TOGGLE_START_GAME"
  };
};

export const addUsers = users => {
  console.log("these are the users:", users);
  return {
    type: "ADD_USERS",
    payload: users
  };
};

export const removeUsers = () => {
  return {
    type: "REMOVE_USERS"
  };
};

export const addAnswers = answerObj => {
  return {
    type: "ADD_ANSWERS",
    payload: answerObj
  };
};

export const toggleAnswerForm = () => {
  return {
    type: "TOGGLE_ANSWER_FORM"
  };
};

export const incrementRound = () => {
  return {
    type: "INCREMENT_ROUND"
  };
};

export const exitGame = () => {
  return {
    type: "EXIT_GAME"
  };
};

export const loadJudges = () => {
  return {
    type: "LOAD_JUDGES"
  };
};

export const updateJudge = () => {
  return {
    type: "UPDATE_JUDGE"
  };
};

export const loadFirstRound = () => {
  return {
    type: "LOAD_FIRST_ROUND"
  };
};

export const clearAvailableGames = () => {
  return {
    type: "CLEAR_AVAILABLE_GAMES"
  };
};
