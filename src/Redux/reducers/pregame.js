const initialState = {
  newGameModal: false,
  isGameOpen: false,
  viewGames: false,
  availableGames: [],
  currentGame: {},
  users: [],
  friends: [],
  rounds: {},
  startGame: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_NEW_GAME_MODAL":
      return { ...state, newGameModal: !state.newGameModal };
    case "NEW_CURRENT_GAME":
      return {
        ...state,
        currentGame: action.payload
      };
    case "TOGGLE_VIEW_GAMES":
      return { ...state, viewGames: !state.viewGames };
    case "ADD_GAMES":
      return { ...state, availableGames: action.payload };
    case "PUT_ROUNDS":
      return { ...state, rounds: action.payload };
    case "HANDLE_RECEIVED_GAME":
      return {
        ...state,
        availableGames: [...state.availableGames, action.payload]
      };
    case "ADD_USERS":
      if (action.payload.length === 1 && state.users.length === 0)
        return { ...state, users: action.payload };
      else if (action.payload.length === 2 || (3 && state.users.length === 0)) {
        return { ...state, users: action.payload };
      } else {
        let checker = {};
        for (let i = 0; i < state.users.length; i++) {
          checker[state.users[i].id] = true;
        }
        for (let i = 0; i < action.payload.length; i++) {
          if (!checker[action.payload[i].id]) {
            let newArray = [...state.users, action.payload[i]];
            return { ...state, users: newArray };
          }
        }
        break;
      }
    case "PLAYER_TWO_ADDS_CURRENT_GAME":
      return { ...state, currentGame: action.payload };
    case "ADD_FRIEND":
      return { ...state, friends: action.payload };
    case "TOGGLE_GAME":
      return { ...state, isGameOpen: !state.isGameOpen };
    case "OPEN_GAME":
      return { ...state, isGameOpen: true };
    case "TOGGLE_START_GAME":
      return {
        ...state,
        startGame: !state.startGame
      };
    case "REMOVE_CURRENT_GAME":
      return { ...state, currentGame: {} };
    case "REMOVE_AVAILABLE_GAME":
      return {
        ...state,
        availableGames: state.availableGames.filter(game => {
          return game.id !== action.payload;
        })
      };
    case "CLEAR_AVAILABLE_GAMES":
      return { ...state, availableGames: [] };
    case "GAME_NO_LONGER_OPEN":
      return { ...state, isGameOpen: false };
    case "REMOVE_FRIEND":
      return { ...state, friends: [] };
    case "REMOVE_USERS":
      return { ...state, users: [] };
    case "PREGAME_EXIT":
      return {
        ...state,
        isGameOpen: false,
        viewGames: false,
        currentGame: {},
        users: [],
        friends: [],
        rounds: {},
        startGame: false
      };
    default:
      return state;
  }
}
