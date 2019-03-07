//state and action are both objects
//import memes from "../memes";

const initialState = {
  memes: [],
  selectedMeme: {},
  isModalOpen: false,
  newMemeUrl: "",
  loginModalOpen: false,
  signupModalOpen: false,
  newGameModal: false,
  currentUser: {},
  isGameOpen: false,
  availableGames: [],
  currentGame: {},
  rounds: [],
  viewGames: false,
  friend: [],
  users: [],
  currentRound: 1,
  startGame: false
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
    case "NEW_MEME_CLICK":
      return {
        ...state,
        isModalOpen: action.payload.bool,
        newMemeUrl: action.payload.url
      };
    case "OPEN_LOGIN_MODAL":
      return { ...state, loginModalOpen: action.payload };
    case "CLOSE_LOGIN_MODAL":
      return { ...state, loginModalOpen: action.payload };
    case "OPEN_SIGNUP_MODAL":
      return { ...state, signupModalOpen: action.payload };
    case "CLOSE_SIGNUP_MODAL":
      return { ...state, signupModalOpen: action.payload };
    case "REG_USER":
      return { ...state, currentUser: action.payload };
    case "LOG_USER_IN":
      return { ...state, currentUser: action.payload };
    case "JWT_LOG":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return {
        ...state,
        currentUser: action.payload,
        loginModalOpen: false,
        signupModalOpen: false
      };
    case "TOGGLE_GAME":
      return { ...state, isGameOpen: !state.isGameOpen };
    case "TOGGLE_NEW_GAME_MODAL":
      return { ...state, newGameModal: !state.newGameModal };
    case "NEW_CURRENT_GAME":
      return {
        ...state,
        currentGame: action.payload
      };
    case "ADD_GAMES":
      return { ...state, availableGames: action.payload };
    case "HANDLE_RECEIVED_GAME":
      return {
        ...state,
        availableGames: [...state.availableGames, action.payload]
      };
    case "TOGGLE_VIEW_GAMES":
      return { ...state, viewGames: !state.viewGames };
    case "PUT_ROUNDS":
      return { ...state, rounds: action.payload };
    case "REMOVE_CURRENT_GAME":
      return { ...state, currentGame: {} };
    case "REMOVE_AVAILABLE_GAME":
      return {
        ...state,
        availableGames: state.availableGames.filter(game => {
          return game.id !== action.payload;
        })
      };
    case "PLAYER_TWO_ADDS_CURRENT_GAME":
      return { ...state, currentGame: action.payload };
    case "GAME_NO_LONGER_OPEN":
      return { ...state, isGameOpen: false };
    case "OPEN_GAME":
      return { ...state, isGameOpen: true };
    case "ADD_FRIEND":
      return { ...state, friend: action.payload };
    case "REMOVE_FRIEND":
      return { ...state, friend: [] };
    case "SET_CURRENT_ROUND":
      return { ...state, currentRound: action.payload };
    case "TOGGLE_START_GAME":
      return { ...state, startGame: !state.startGame };
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "REMOVE_USERS":
      return { ...state, users: [] };
    default:
      return state;
  }
};

export default reducer;
