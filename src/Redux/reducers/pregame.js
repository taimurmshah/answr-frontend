const initialState = {
  newGameModal: false,
  isGameOpen: false,
  viewGames: false,
  availableGames: [],
  startGame: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_NEW_GAME_MODAL":
      return { ...state, newGameModal: !state.newGameModal };

    case "TOGGLE_VIEW_GAMES":
      return { ...state, viewGames: !state.viewGames };
    case "ADD_GAMES":
      return { ...state, availableGames: action.payload };

    case "HANDLE_RECEIVED_GAME":
      return {
        ...state,
        availableGames: [...state.availableGames, action.payload]
      };

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
