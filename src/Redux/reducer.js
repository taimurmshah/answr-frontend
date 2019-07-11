//state and action are both objects
//import memes from "../memes";

/* todo i should create many reducers, such as one for modals, one for gameplay, one for auth, etc. I can follow traversy brad's examples.
 *   I can have a gamePlay reducer, an auth reducer, a modal reducer, a gameList reducer, and general state reducer?*/
const initialState = {
  isModalOpen: false,
  loginModalOpen: false,
  signupModalOpen: false,
  newGameModal: false,
  currentUser: {},
  /*todo what does isGameOpen control?*/
  isGameOpen: false,
  availableGames: [],
  currentGame: {},
  rounds: [],
  viewGames: false,
  friends: [],
  users: [],
  currentRound: 1,
  currentQuestion: null,
  startGame: false,
  answers: { 1: [], 2: [], 3: [] },
  answerForm: true,
  isJudge: false,
  judge1: null,
  judge2: null,
  judge3: null,
  currentJudge: null
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
      return { ...state, friends: action.payload };
    case "REMOVE_FRIEND":
      return { ...state, friends: [] };
    case "SET_CURRENT_ROUND":
      return { ...state, currentRound: action.payload };
    case "TOGGLE_START_GAME":
      return {
        ...state,
        startGame: !state.startGame
      };
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "REMOVE_USERS":
      return { ...state, users: [] };
    case "ADD_ANSWERS":
      let array = state.answers[state.currentRound];
      array = [...array, action.payload];
      let answers = { ...state.answers };
      answers[state.currentRound] = array;
      return { ...state, answers: answers };
    case "TOGGLE_ANSWER_FORM":
      return { ...state, answerForm: !state.answerForm };
    case "INCREMENT_ROUND":
      let newRound = state.currentRound + 1;
      return { ...state, currentRound: newRound };
    case "EXIT_GAME":
      return {
        ...state,
        isGameOpen: false,
        currentGame: {},
        rounds: [],
        viewGames: false,
        friend: [],
        users: [],
        currentRound: 1,
        startGame: false,
        answers: { 1: [], 2: [], 3: [] },
        answerForm: true
      };
    case "LOAD_JUDGES":
      return {
        ...state,
        judge1: state.users[2],
        judge2: state.users[1],
        judge3: state.users[0]
      };
    case "UPDATE_JUDGE":
      if (state.currentRound === 1) {
        return { ...state, currentJudge: state.judge1 };
      } else if (state.currentRound === 2) {
        return { ...state, currentJudge: state.judge2 };
      } else {
        return { ...state, currentJudge: state.judge3 };
      }
    case "LOAD_FIRST_ROUND":
      console.log("state.rounds:", state.rounds);
      return {
        ...state,
        currentRound: state.rounds["one"][0]
      };
    default:
      return state;
  }
};

export default reducer;
